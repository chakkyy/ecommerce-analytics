import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { TenantInstance } from '@modules/tenant/tenant.module';
import { HOURS_GAPS } from '@utils/date';
import { buildVtexConnection, getCredentials, vtex } from '@utils/vtex';
import { Queue } from 'bull';
import { eachDayOfInterval, format } from 'date-fns';
import { buildCategoryTree, buildBrand } from '@utils/vtex';

export const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
export const GET_ORDERS = '/api/oms/pvt/orders';
export const GET_ORDER = '/api/oms/pvt/orders';
export const GET_BRANDS = '/api/catalog_system/pvt/brand/list';
export const GET_CATEGORIES = '/api/catalog_system/pvt/category/tree/3';
export const GET_CATEGORY = '/api/catalog/pvt/category';
// create a new endpoint to get product by id
export const GET_PRODUCT = '/api/catalog/pvt/product';
export const GET_USER_EMAIL = '/api/dataentities/CL/search?_fields=email';
export const VTEX_EMAIL_DOMAIN = '.ct.vtex.com.br';
export const VTEX_MAX_PAGE = 30;
import { Op } from 'sequelize';

const NO_ORDERS = 0;

const STATUS_FILTERS = [
  'invoiced',
  'waiting-for-sellers-confirmation',
  'payment-approved',
  'handling',
  'ready-for-handling',
  'payment-pending',
  'canceled',
];

const VTEX_MAX_PER_PAGE = 100;
/**
 *
 * @returns a string of urls to fetch orders
 */
export const fetchOrders = async ({
  startDate,
  endDate,
  ...connection
}: {
  startDate: string;
  endDate: string;
  baseUrl: string;
  appKey: string;
  appToken: string;
}): Promise<Array<string>> => {
  const vtexConnection = buildVtexConnection(connection);
  const ALL_DAY_START_DATE = `${startDate}T00:00:00.000Z`;
  const ALL_DAY_END_DATE = `${endDate}T23:59:59.999Z`;
  const orders: string[] = [];
  // First try to get all orders for the day so we can check if there are more than 30 pages
  const countQueryStateless = `${GET_ORDERS}?f_creationDate=creationDate:[${ALL_DAY_START_DATE} TO ${ALL_DAY_END_DATE}]&page=1&per_page=${VTEX_MAX_PER_PAGE}`;
  const {
    paging: { pages },
  } = await vtex(countQueryStateless, vtexConnection);

  if (pages === NO_ORDERS) return [];
  if (pages < VTEX_MAX_PAGE) return [countQueryStateless];
  // If there are more than 30 pages, split by status
  await Promise.all(
    STATUS_FILTERS.map(async status => {
      const countQuery = `${GET_ORDERS}?f_creationDate=creationDate:[${ALL_DAY_START_DATE} TO ${ALL_DAY_END_DATE}]&page=1&per_page=${VTEX_MAX_PER_PAGE}&f_status=${status}`;
      const {
        paging: { pages },
      } = await vtex(countQuery, vtexConnection);
      if (pages === NO_ORDERS) {
        return;
      }
      console.log(status, 'date', format(new Date(startDate), 'yyyy-MM-dd'), 'pages', pages);
      const pagesToFetch = Array.from({ length: pages }, (_, i) => i + 1);
      if (pagesToFetch.length > VTEX_MAX_PAGE) {
        console.log('Splitting by hours...');
        for (const hourGap of HOURS_GAPS) {
          const { start, end } = hourGap;
          const countQuery = `${GET_ORDERS}?f_creationDate=creationDate:[${startDate}T${start} TO ${endDate}T${end}]&per_page=${VTEX_MAX_PER_PAGE}&f_status=${status}`;
          try {
            const {
              paging: { pages },
            }: { paging: { pages: number } } = await vtex(countQuery, vtexConnection);
            if (pages === NO_ORDERS) {
              return;
            }
            const pagesToFetch = Array.from({ length: pages }, (_, i) => i + 1);
            // @TODO split by 15 minutes if pagesToFetch > 30
            orders.push(
              ...pagesToFetch.map(
                page =>
                  `${GET_ORDERS}?f_creationDate=creationDate:[${startDate}T${start} TO ${endDate}T${end}]&per_page=${VTEX_MAX_PER_PAGE}&page=${page}&f_status=${status}`
              )
            );
          } catch (error) {
            console.log('error', error);
          }
        }
      } else {
        orders.push(
          ...pagesToFetch.map(
            page =>
              `${GET_ORDERS}?f_creationDate=creationDate:[${ALL_DAY_START_DATE} TO ${ALL_DAY_END_DATE}]&per_page=${VTEX_MAX_PER_PAGE}&page=${page}&f_status=${status}`
          )
        );
      }
    })
  );
  return orders;
};

// fetch Department
export const fetchCategoryTree = async (sequelize, vtexConnection, ecommerceConnectId) => {
  try {
    const departments = await vtex(`${GET_CATEGORIES}`, vtexConnection);
    const categoryTreePull = await departments.map(categoryTree => {
      const itemCategory = {
        id: categoryTree.id,
        name: categoryTree.name,
        hasChildren: categoryTree.hasChildren,
        Title: categoryTree.Title,
        MetaTagDescription: categoryTree.MetaTagDescription,
        url: categoryTree.url,
        idVtex: categoryTree.id,
        parentCategoryId: null,
        categoryLevelId: 1,
      };
      return buildCategoryTree(itemCategory, ecommerceConnectId);
    });

    await sequelize.models.EcommerceCategoryTree.bulkCreate(categoryTreePull, {
      updateOnDuplicate: ['name'],
    });

    for (const item of departments) {
      const categoryTreePull = await item.children.map(categoryTree => {
        const itemCategory = {
          id: categoryTree.id,
          name: categoryTree.name,
          hasChildren: categoryTree.hasChildren,
          Title: categoryTree.Title,
          MetaTagDescription: categoryTree.MetaTagDescription,
          url: categoryTree.url,
          idVtex: categoryTree.id,
          parentCategoryId: item.id,
          categoryLevelId: 2,
        };

        return buildCategoryTree(itemCategory, ecommerceConnectId);
      });

      await sequelize.models.EcommerceCategoryTree.bulkCreate(categoryTreePull, {
        updateOnDuplicate: ['name'],
      });

      for (const subItem of item.children) {
        const categoryTreePull = await subItem.children.map(categoryTree => {
          const itemCategorySub = {
            id: categoryTree.id,
            name: categoryTree.name,
            hasChildren: categoryTree.hasChildren,
            Title: categoryTree.Title,
            MetaTagDescription: categoryTree.MetaTagDescription,
            url: categoryTree.url,
            idVtex: categoryTree.id,
            parentCategoryId: subItem.id,
            categoryLevelId: 3,
          };
          return buildCategoryTree(itemCategorySub, ecommerceConnectId);
        });

        await sequelize.models.EcommerceCategoryTree.bulkCreate(categoryTreePull, {
          updateOnDuplicate: ['name'],
        });
      }
    }
    console.log('Cateogory Tree were created or updated ', departments.length);
  } catch (error) {
    console.log('error created Category Tree', error);
  }
};

// fetch Brands
export const fetchBrands = async (sequelize, vtexConnection, ecommerceConnectId) => {
  try {
    const brands = await vtex(`${GET_BRANDS}`, vtexConnection);
    const saveBrand = brands.map(brand => buildBrand(brand, ecommerceConnectId));
    const updatePull = await sequelize.models.EcommerceBrand.bulkCreate(saveBrand, {
      updateOnDuplicate: ['name'],
    });
    console.log('Brands were created or updated ', updatePull.length);
  } catch (error) {
    console.log('error Fetch and Created Brands', error);
  }
};

// updateProductsAll
export const updateProductsAll = async (sequelize, vtexConnection, ecommerceConnectId) => {
  try {
    const searchProduct = await sequelize.models.EcommerceProduct.findAll({
      where: {
        ecommerceConnectId,
        [Op.or]: [{ ecommerceBrandId: null }, { ecommerceCategoryTreesId: null }],
      },
      limit: 200,
    });

    if (!searchProduct) {
      console.log('all products are already updated');
      return;
    }

    const updatePromises = searchProduct.map(async product => {
      const reqProduct = await vtex(`${GET_PRODUCT}/${product.productId}`, vtexConnection);
      let searchCategory = await sequelize.models.EcommerceCategoryTree.findOne({
        where: {
          id: reqProduct.CategoryId,
        },
      });
      if (!searchCategory) {
        console.log('category not found', reqProduct.CategoryId);
        await fetchCategoryAndUpdate(reqProduct.CategoryId, sequelize, vtexConnection, ecommerceConnectId);
        searchCategory = await sequelize.models.EcommerceCategoryTree.findOne({
          where: {
            id: reqProduct.CategoryId,
          },
        });
      }

      return {
        ...product.get({ plain: true }),
        ecommerceBrandId: reqProduct.BrandId || null,
        ecommerceCategoryTreesId: searchCategory ? reqProduct.CategoryId : null,
      };
    });
    const updateProduct = await Promise.all(updatePromises);
    await sequelize.models.EcommerceProduct.bulkCreate(updateProduct, {
      updateOnDuplicate: ['name', 'ecommerceCategoryTreesId', 'ecommerceBrandId'],
    });
    console.log('products were created or updated', searchProduct.length);
  } catch (error) {
    console.error('--there was an error processing product', error);
  }
};

// fetchCategoryAndUpdate
export const fetchCategoryAndUpdate = async (categoryId, sequelize, vtexConnection, ecommerceConnectId) => {
  try {
    // search category
    const fetchCategory = await vtex(`${GET_CATEGORY}/${categoryId}`, vtexConnection);

    const itemCategory = {
      id: fetchCategory.Id,
      name: fetchCategory.Name,
      hasChildren: fetchCategory.HasChildren,
      Title: fetchCategory.Title,
      metaTagDescription: fetchCategory.MetaTagDescription,
      url: fetchCategory.url || null,
      idVtex: fetchCategory.Id,
      parentCategoryId: fetchCategory.FatherCategoryId,
    };
    // build category
    const itemCategoryBuid = buildCategoryTree(itemCategory, ecommerceConnectId);

    // update category
    await sequelize.models.EcommerceCategoryTree.bulkCreate([itemCategoryBuid], {
      updateOnDuplicate: ['name', 'parentCategoryId', 'id', 'idVtex', 'title', 'metaTagDescription', 'url'],
    });

    return itemCategoryBuid;
  } catch (error) {
    console.log('error Fetch and Created Category', error);
  }
};

export const getOrder = async (order, connection) => {
  const orderDetail = await vtex(`${GET_ORDER}/${order.orderId}`, connection);
  order['orderDetail'] = orderDetail;
  return orderDetail;
};

export function getUserEmail(emailVtex: string) {
  // Split the Vtex email
  const parts = emailVtex.split('-');
  const lastElementIndex = parts.length - 1;
  const lastElement = parts[lastElementIndex];
  let email = emailVtex;

  // Check if last part has Vtex email structure
  if (lastElement.includes(VTEX_EMAIL_DOMAIN)) {
    email = parts.slice(0, -1).join('-');
  }

  // Check if the result is a proper email
  if (!emailRegex.test(email)) {
    return null;
  }

  return email;
}

export const syncVtex = async ({
  ecommerceConnectId,
  startDate,
  endDate,
  tenant,
  queue,
}: {
  ecommerceConnectId: number;
  startDate: Date;
  endDate: Date;
  tenant: TenantInstance;
  queue: Queue;
}) => {
  try {
    const ecommerceConnectRepository = tenant.connection.getRepository(EcommerceConnect);
    const ecommerceCredentialRepository = tenant.connection.getRepository(EcommerceCredential);

    const ecommerceConnect = await ecommerceConnectRepository.findOne({
      where: {
        id: ecommerceConnectId,
        strategy: 'vtex',
      },
      include: [
        {
          model: ecommerceCredentialRepository,
        },
      ],
    });
    if (!ecommerceConnect) {
      throw new Error(`EcommerceConnect not found for id ${ecommerceConnectId}`);
    }

    const { url, public_key, private_key } = getCredentials(ecommerceConnect);

    const dates = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    for (const date of dates) {
      try {
        const pageArray = await fetchOrders({
          startDate: format(date, 'yyyy-MM-dd'),
          endDate: format(date, 'yyyy-MM-dd'),
          baseUrl: url,
          appKey: public_key,
          appToken: private_key,
        });
        // add all tasks at once to queue
        await queue.addBulk(
          pageArray.map(page => ({
            data: {
              baseUrl: url,
              url: page,
              appKey: public_key,
              appToken: private_key,
              ecommerceConnectId,
              database: tenant.database,
            },
            opts: {
              attempts: 0,
            },
          }))
        );
      } catch (error) {
        console.error('error fetching', date);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export interface OrdersRoot {
  list: ListItem[];
  facets: any[];
  paging: Paging;
  stats: Stats;
  reportRecordsLimit: number;
}

export interface ListItem {
  orderId: string;
  creationDate: string;
  clientName: string;
  items: any;
  totalValue: number;
  paymentNames: string;
  status: string;
  statusDescription: string;
  marketPlaceOrderId: any;
  sequence: string;
  salesChannel: string;
  affiliateId: string;
  origin: string;
  workflowInErrorState: boolean;
  workflowInRetry: boolean;
  lastMessageUnread: any;
  ShippingEstimatedDate: string;
  ShippingEstimatedDateMax: string;
  ShippingEstimatedDateMin: string;
  orderIsComplete: boolean;
  listId: any;
  listType: any;
  authorizedDate: string;
  callCenterOperatorName: any;
  totalItems: number;
  currencyCode: string;
  hostname: string;
  invoiceOutput: any;
  invoiceInput: any;
  lastChange: string;
  isAllDelivered: boolean;
  isAnyDelivered: boolean;
  giftCardProviders: any;
  orderFormId: string;
  paymentApprovedDate: string;
  readyForHandlingDate: any;
  deliveryDates: any;
}

export interface Paging {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
}

export interface Stats {
  stats: StatsDetail;
}

export interface StatsDetail {
  totalValue: TotalValue;
  totalItems: TotalItems;
}

export interface TotalValue {
  Count: number;
  Max: number;
  Mean: number;
  Min: number;
  Missing: number;
  StdDev: number;
  Sum: number;
  SumOfSquares: number;
  Facets: any;
}
export interface TotalItems {
  Count: number;
  Max: number;
  Mean: number;
  Min: number;
  Missing: number;
  StdDev: number;
  Sum: number;
  SumOfSquares: number;
  Facets: any;
}

// ORDER DETAIL

export interface OrderDetailRoot {
  orderId: string;
  sequence: string;
  marketplaceOrderId: string;
  marketplaceServicesEndpoint: any;
  sellerOrderId: string;
  origin: string;
  affiliateId: string;
  salesChannel: string;
  merchantName: string;
  status: string;
  workflowIsInError: boolean;
  statusDescription: string;
  value: number;
  creationDate: string;
  lastChange: string;
  orderGroup: string;
  totals: Total[];
  items: Item[];
  marketplaceItems: any[];
  clientProfileData: ClientProfileData;
  giftRegistryData: any;
  marketingData: MarketingData;
  ratesAndBenefitsData: RatesAndBenefitsData;
  shippingData: ShippingData;
  paymentData: PaymentData;
  packageAttachment: PackageAttachment;
  sellers: Seller[];
  callCenterOperatorData: any;
  followUpEmail: string;
  lastMessage: any;
  hostname: string;
  invoiceData: any;
  changesAttachment: any;
  openTextField: any;
  roundingError: number;
  orderFormId: string;
  commercialConditionData: any;
  isCompleted: boolean;
  customData: CustomData;
  storePreferencesData: StorePreferencesData;
  allowCancellation: boolean;
  allowEdition: boolean;
  isCheckedIn: boolean;
  marketplace: any;
  authorizedDate: string;
  invoicedDate: any;
  cancelReason: any;
  itemMetadata: ItemMetadata;
  subscriptionData: any;
  taxData: any;
  checkedInPickupPointId: any;
  cancellationData: any;
  clientPreferencesData: ClientPreferencesData;
}

export interface Total {
  id: string;
  name: string;
  value: number;
}

export interface Item {
  uniqueId: string;
  id: string;
  productId: string;
  BrandId: any;
  ecommerceBrandId: number;
  CategoryId: any;
  ecommerceSubCategoriesId: number;
  ean: string;
  lockId: any;
  itemAttachment: ItemAttachment;
  attachments: any[];
  quantity: number;
  seller: string;
  name: string;
  refId: any;
  price: number;
  listPrice: number;
  manualPrice: any;
  priceTags: PriceTag[];
  imageUrl: string;
  detailUrl: string;
  components: any[];
  bundleItems: any[];
  params: any[];
  offerings: any[];
  attachmentOfferings: any[];
  sellerSku: string;
  priceValidUntil: string;
  commission: number;
  tax: number;
  preSaleDate: any;
  additionalInfo: AdditionalInfo;
  measurementUnit: string;
  unitMultiplier: number;
  sellingPrice: number;
  isGift: boolean;
  shippingPrice: any;
  rewardValue: number;
  freightCommission: number;
  priceDefinition: PriceDefinition;
  taxCode: string;
  parentItemIndex: any;
  parentAssemblyBinding: any;
  callCenterOperator: any;
  serialNumbers: any;
  assemblies: any[];
  costPrice: any;
}

export interface ItemAttachment {
  content: any;
  name: any;
}

export interface PriceTag {
  name: string;
  value: number;
  isPercentual: boolean;
  identifier: string;
  rawValue: number;
  rate: any;
  jurisCode: any;
  jurisType: any;
  jurisName: any;
}

export interface AdditionalInfo {
  brandName: string;
  brandId: string;
  categoriesIds: string;
  categories: Category[];
  productClusterId: string;
  commercialConditionId: string;
  dimension: Dimension;
  offeringInfo: any;
  offeringType: any;
  offeringTypeId: any;
}

export interface Category {
  id: number;
  name: string;
}

export interface Dimension {
  cubicweight: number;
  height: number;
  length: number;
  weight: number;
  width: number;
}

export interface PriceDefinition {
  sellingPrices: SellingPrice[];
  calculatedSellingPrice: number;
  total: number;
}

export interface SellingPrice {
  value: number;
  quantity: number;
}

export interface ClientProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentType: string;
  document: string;
  phone: string;
  corporateName: any;
  tradeName: any;
  corporateDocument: any;
  stateInscription: any;
  corporatePhone: any;
  isCorporate: boolean;
  userProfileId: string;
  userProfileVersion: any;
  customerClass: any;
}

export interface MarketingData {
  id: string;
  utmSource: any;
  utmPartner: any;
  utmMedium: any;
  utmCampaign: any;
  coupon: any;
  utmiCampaign: any;
  utmipage: any;
  utmiPart: any;
  marketingTags: string[];
}

export interface RatesAndBenefitsData {
  id: string;
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[];
}

export interface RateAndBenefitsIdentifier {
  description?: string;
  featured: boolean;
  id: string;
  name: string;
  matchedParameters: MatchedParameters;
  additionalInfo?: AdditionalInfo2;
}

export interface MatchedParameters {
  slaIds?: string;
  'category@CatalogSystem'?: string;
  'productCluster@CatalogSystem'?: string;
  'product@CatalogSystem'?: string;
}

export interface AdditionalInfo2 {
  Comercial: string;
}

export interface ShippingData {
  id: string;
  address: Address;
  logisticsInfo: LogisticsInfo[];
  trackingHints: any;
  selectedAddresses: SelectedAddress[];
}

export interface Address {
  addressType: string;
  receiverName: string;
  addressId: string;
  versionId: any;
  entityId: any;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string;
  geoCoordinates: number[];
}

export interface LogisticsInfo {
  itemIndex: number;
  selectedSla: string;
  lockTTL: string;
  price: number;
  listPrice: number;
  sellingPrice: number;
  deliveryWindow: DeliveryWindow;
  deliveryCompany: string;
  shippingEstimate: string;
  shippingEstimateDate: string;
  slas: Sla[];
  shipsTo: string[];
  deliveryIds: DeliveryId[];
  deliveryChannels: DeliveryChannel[];
  deliveryChannel: string;
  pickupStoreInfo: PickupStoreInfo2;
  addressId: string;
  versionId: any;
  entityId: any;
  polygonName: string;
  pickupPointId: any;
  transitTime: string;
}

export interface DeliveryWindow {
  startDateUtc: string;
  endDateUtc: string;
  price: number;
}

export interface Sla {
  id: string;
  name: string;
  shippingEstimate: string;
  deliveryWindow: DeliveryWindow2;
  price: number;
  deliveryChannel: string;
  pickupStoreInfo: PickupStoreInfo;
  polygonName: string;
  lockTTL: string;
  pickupPointId: any;
  transitTime: string;
  pickupDistance: any;
}

export interface DeliveryWindow2 {
  startDateUtc: string;
  endDateUtc: string;
  price: number;
}

export interface PickupStoreInfo {
  additionalInfo: any;
  address: any;
  dockId: any;
  friendlyName: any;
  isPickupStore: boolean;
}

export interface DeliveryId {
  courierId: string;
  courierName: string;
  dockId: string;
  quantity: number;
  warehouseId: string;
  accountCarrierName: any;
  kitItemDetails: any[];
}

export interface DeliveryChannel {
  id: string;
  stockBalance: number;
}

export interface PickupStoreInfo2 {
  additionalInfo: any;
  address: any;
  dockId: any;
  friendlyName: any;
  isPickupStore: boolean;
}

export interface SelectedAddress {
  addressId: string;
  versionId: any;
  entityId: any;
  addressType: string;
  receiverName: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  reference: string;
  geoCoordinates: number[];
}

export interface PaymentData {
  giftCards: any[];
  transactions: Transaction[];
}

export interface Transaction {
  isActive: boolean;
  transactionId: string;
  merchantName: string;
  payments: Payment[];
}

export interface Payment {
  id: string;
  paymentSystem: string;
  paymentSystemName: string;
  value: number;
  installments: number;
  referenceValue: number;
  cardHolder: any;
  cardNumber: any;
  firstDigits: any;
  lastDigits: any;
  cvv2: any;
  expireMonth: any;
  expireYear: any;
  url: any;
  giftCardId: any;
  giftCardName: any;
  giftCardCaption: any;
  redemptionCode: any;
  group: string;
  tid: any;
  dueDate: any;
  connectorResponses: any;
  giftCardProvider: any;
  giftCardAsDiscount: any;
  koinUrl: any;
  accountId: any;
  parentAccountId: any;
  bankIssuedInvoiceIdentificationNumber: any;
  bankIssuedInvoiceIdentificationNumberFormatted: any;
  bankIssuedInvoiceBarCodeNumber: any;
  bankIssuedInvoiceBarCodeType: any;
  billingAddress: any;
}

export interface PackageAttachment {
  packages: any[];
}

export interface Seller {
  id: string;
  name: string;
  logo: string;
  fulfillmentEndpoint: string;
}

export interface CustomData {
  customApps: CustomApp[];
}

export interface CustomApp {
  fields: Fields;
  id: string;
  major: number;
}

export interface Fields {
  redime_puntos: string;
  criterio_sustitucion: string;
  Pago_en_linea: string;
  Devolución_de_dinero: string;
  TCO_Mastercard: string;
  franquicia_contraentrega: string;
  cupon: string;
}

export interface StorePreferencesData {
  countryCode: string;
  currencyCode: string;
  currencyFormatInfo: CurrencyFormatInfo;
  currencyLocale: number;
  currencySymbol: string;
  timeZone: string;
}

export interface CurrencyFormatInfo {
  CurrencyDecimalDigits: number;
  CurrencyDecimalSeparator: string;
  CurrencyGroupSeparator: string;
  CurrencyGroupSize: number;
  StartsWithCurrencySymbol: boolean;
}

export interface ItemMetadata {
  Items: Item2[];
}

export interface Item2 {
  Id: string;
  Seller: string;
  Name: string;
  SkuName: string;
  ProductId: string;
  RefId: any;
  Ean: string;
  ImageUrl: string;
  DetailUrl: string;
  AssemblyOptions: any[];
}

export interface ClientPreferencesData {
  locale: string;
  optinNewsLetter: boolean;
}
