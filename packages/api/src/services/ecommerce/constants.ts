export const serviceMapper = {
  FINANCE: 'financeService',
  SALES: 'salesService',
  MARKETING: 'marketingService',
};

export const methodMapper = {
  // FINANCE
  TRANSACTION_COSTS: 'TRANSACTION_COSTS',
  TOTAL_COSTS: 'TOTAL_COSTS',
  PROFITABILITY: 'PROFITABILITY',
  CUMULATIVE_REVENUE: 'CUMULATIVE_REVENUE',
  STORE_DISTRIBUTION_COST: 'storeDistributionCost',
  STORE_TOTAL_COST: 'storeTotalCost',
  STORE_GROSS_MARGIN: 'storeGrossMargin',
  STORE_NET_PROFITABILITY: 'storeNetProfitability',
  STORE_ROI: 'storeROI',
  STORE_INVENTORY_ROTATION: 'storeInventoryRotation',
  STORE_DISCOUNT_RATE: 'storeDiscountRate',
  STORE_PRODUCT_RETURN_RATE: 'storeProductReturnRate',
  // MARKETING
  CONVERSION: 'conversionRate',
  NUMBER_OF_PAGE_VIEWED: 'totalVisitors',
  NUMBER_OF_UNIQUE_VISITORS: 'uniqueVisitors',
  REFERRED_TRAFFIC_PERCENTAGE: 'referredTrafficPercentage',
  VISITOR_TO_CUSTOMER_CONVERSION_RATE: 'visitorToCustomerConversionRate',
  BOUNCE_RATE: 'bounceRate',
  CART_ABANDONMENT_RATE: 'abandonedCart',
  CUSTOMER_SATISFACTION_RATE: 'satisfactoryRate',
  NUMBER_OF_ORDERS_PER_SELLER: 'NUMBER_OF_ORDERS_PER_SELLER',
  MOBILE_TRAFFIC_PERCENTAGE: 'MOBILE_TRAFFIC_PERCENTAGE',
  SITE_CLICK_RATE: 'SITE_CLICK_RATE',
  TIME_SPENT_ON_SITE: 'TIME_SPENT_ON_SITE',
  SITE_WEB_TRAFFIC: 'SITE_WEB_TRAFFIC',
  AVERAGE_CHURN_RATE: 'AVERAGE_CHURN_RATE',
  AVERAGE_RECENCY: 'AVERAGE_RECENCY',
  REGULAR_CUSTOMER_RATE: 'REGULAR_CUSTOMER_RATE',
  STORE_CONVERSION_RATE: 'storeConversionRate',
  STORE_SUPPLY_CHAIN_EFFICIENCY: 'storeSupplyChainEfficiency',
  STORE_STOCK_DEPLETION_RATE: 'storeStockDepletionRate',
  STORE_ORDERS_BY_CLIENT: 'storeOrdersByClient',
  STORE_ORDERS_TOTAL: 'storeOrdersTotal',
  STORE_ORDERS_QUANTITY: 'storeOrdersCount',
  STORE_CLIENTS_QUANTITY: 'storeClientsCount',
  STORE_NEW_CLIENTS_QUANTITY: 'storeNewClientsTotal',
  STORE_FREQUENT_CLIENTS_QUANTITY: 'storeRecurringClientsTotal',
  GA_USERS: 'gaUsers',
  GA_SESSIONS: 'gaSessions',
  GA_SESSIONS_PER_REFERRAL: 'gaSessionsPerReferral',
  GA_SALES_PER_USERS: 'gaSalesPerUsers',
  // SEGMENTS
  SEGMENT_VALUE: 'segmentValue',
  SEGMENT_REVENUE: 'segmentRevenue',
  AVERAGE_REVENUE_PER_CUSTOMER: 'AVERAGE_REVENUE_PER_CUSTOMER',
  USERS_BY_SEGMENT: 'usersBySegment',
  // SALES
  TRANSACTION_REVENUE: 'incomeByTransaction',
  TOTAL_REVENUE: 'totalRevenue',
  AVERAGE_ORDER_VALUE: 'averageTicket',
  ORDERS: 'orders',
  CONVERSION_RATE_FROM_CUSTOMERS_TO_BUYERS: 'CONVERSION_RATE_FROM_CUSTOMERS_TO_BUYERS',
  NUMBER_OF_CUSTOMERS_PER_SEGMENT: 'NUMBER_OF_CUSTOMERS_PER_SEGMENT',
  NUMBER_OF_ORDERS: 'NUMBER_OF_ORDERS',
  AVERAGE_BASKET_SIZE: 'AVERAGE_BASKET_SIZE',
  AVERAGE_FRECUENCY: 'AVERAGE_FRECUENCY',
  AVERAGE_DAYS_TO_SECOND_ORDER: 'AVERAGE_DAYS_TO_SECOND_ORDER',
  PRODUCT_TYPE: 'PRODUCT_TYPE',
  STORE_ORDERS_TOTAL_NET: 'storeTotalSales',
  STORE_TOTAL_SALES: 'storeTotalSalesBySegment',
  STORE_SQUARE_METER_SALES: 'storeSquareMeterSales',
  STORE_AVAILABLE_INVENTORY: 'storeAvailableInventory',
  STORE_AVERAGE_TICKET: 'storeAverageTicket',
};

export const argsMapper = (name: string, args: any) => {
  const commonArgs = {
    startDate: args.startDate,
    endDate: args.endDate,
    ecommerceConnectId: args.ecommerceConnectId,
    additionalArgs: args.additionalArgs,
  };

  switch (name) {
    case methodMapper.ORDERS:
      return {
        ...commonArgs,
        page: 1,
        pageSize: 20,
      };
    default:
      return commonArgs;
  }
};

export const SEGMENT_NAMES = [
  'UNUSED_SEGMENT_ID',
  'CHAMPIONS',
  'BIG_SPENDERS',
  'FREQUENT_SHOPPERS',
  'OCCASIONAL_SHOPPERS',
  'NEW_CUSTOMERS',
  'ASLEEP_CUSTOMERS',
  'INACTIVE_CUSTOMERS',
];
