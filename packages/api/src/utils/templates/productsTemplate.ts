import { Sequelize } from 'sequelize';
import { EcommerceProduct } from '../../models/company/ecommerceProduct.entity';
import BaseTemplate from './baseTemplate';

interface CsvData {
  ID_Producto: string;
  Categoría: string;
  Descripción: string;
  Color: string;
  'Línea de Producto': string;
  Talle: string;
  ID_Tienda: string;
  Stock: string;
  Precio: string;
  Costo_Total: string;
  Descuento: string;
  Precio_con_descuento: string;
  Fecha_Ingreso: string;
}

class ProductsTemplate extends BaseTemplate<CsvData> {
  constructor(sequelize: Sequelize, ecommerceConnectId: number, csv: any) {
    super(sequelize, ecommerceConnectId, csv);

    this.setHeaders([
      'ID_Producto',
      'Categoría',
      'Descripción',
      'Color',
      'Línea de Producto',
      'Talle',
      'ID_Tienda',
      'Stock',
      'Precio',
      'Costo_Total',
      'Descuento',
      'Precio_con_descuento',
      'Fecha_Ingreso',
    ]);
  }

  async parse(): Promise<this> {
    await this.setStores();

    return super.parse();
  }

  protected toEntity(data: CsvData): Partial<EcommerceProduct> {
    const ecommerceStoreId = this.findStoreId(data.ID_Tienda);

    return {
      ecommerceConnectId: this.ecommerceConnectId,
      name: this.parseString(data.Descripción, {
        replaceZero: true,
      }),
      sku: this.parseString(data['Línea de Producto']),
      price: this.parseNumber(data.Precio, 'float'),
      discount: this.parseNumber(data.Descuento, 'float'),
      cost: this.parseNumber(data.Costo_Total, 'float'),
      productId: this.parseString(data.ID_Producto),
      stock: this.parseNumber(data.Stock),
      type: this.parseString(data.Categoría),
      ecommerceStoreId,
      discountPrice: this.parseNumber(data.Precio_con_descuento, 'float'),
      createdAt: this.parseDate(data.Fecha_Ingreso),
    };
  }

  protected async insert() {
    const products = this.parsedResults.data.map(data => this.toEntity(data));

    await this.sequelize.models.EcommerceProduct.bulkCreate(products);
  }
}

export default ProductsTemplate;
