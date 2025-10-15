import { Sequelize } from 'sequelize';
import { EcommerceStore } from '../../models/company/ecommerceStore.entity';
import BaseTemplate from './baseTemplate';

interface CsvData {
  ID_Tienda: string;
  Nombre: string;
  Dirección: string;
  Ciudad: string;
  CP_Tienda: string;
  Q_Empleados: string;
  SUP_Tienda: string;
  Teléfono: string;
}

class StoresTemplate extends BaseTemplate<CsvData> {
  constructor(sequelize: Sequelize, ecommerceConnectId: number, csv: any) {
    super(sequelize, ecommerceConnectId, csv);
    this.setHeaders([
      'ID_Tienda',
      'Nombre',
      'Dirección',
      'Ciudad',
      'CP_Tienda',
      'Q_Empleados',
      'SUP_Tienda',
      'Teléfono',
    ]);
  }

  protected toEntity(data: CsvData): Partial<EcommerceStore> {
    return {
      name: this.parseString(data.Nombre, {
        replaceZero: true,
      }),
      address: this.parseString(data.Dirección, {
        replaceZero: true,
      }),
      city: this.parseString(data.Ciudad, {
        replaceZero: true,
      }),
      postalCode: this.parseString(data.CP_Tienda, {
        replaceZero: true,
      }),
      employees: this.parseNumber(data.Q_Empleados),
      area: this.parseNumber(data.SUP_Tienda),
      phone: this.parseString(data.Teléfono, {
        replaceZero: true,
      }),
      ecommerceStoreId: this.parseString(data.ID_Tienda, {
        omitLeadingZero: true,
      }),
      ecommerceConnectId: this.ecommerceConnectId,
    };
  }

  protected async insert() {
    const stores = this.parsedResults.data.map(data => this.toEntity(data));
    await this.sequelize.models.EcommerceStore.bulkCreate(stores);
  }
}

export default StoresTemplate;
