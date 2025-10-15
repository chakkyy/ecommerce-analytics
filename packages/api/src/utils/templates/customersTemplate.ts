import { Op, Sequelize } from 'sequelize';
import { EcommerceUser } from '../../models/company/ecommerceUser.entity';
import BaseTemplate from './baseTemplate';

interface CsvData {
  ID_Cliente: string;
  Nombre: string;
  Apellido: string;
  Mail: string;
  Teléfono: string;
  Ciudad: string;
}

class CustomersTemplate extends BaseTemplate<CsvData> {
  constructor(sequelize: Sequelize, ecommerceConnectId: number, csv: any) {
    super(sequelize, ecommerceConnectId, csv);
    this.setHeaders(['ID_Cliente', 'Nombre', 'Apellido', 'Mail', 'Teléfono', 'Ciudad']);
  }

  protected toEntity(data: CsvData): Partial<EcommerceUser> {
    return {
      fullName: this.parseString(`${data.Nombre} ${data.Apellido}`.trim(), {
        replaceZero: true,
      }),
      visitorId: this.parseString(data.ID_Cliente),
      email: this.parseString(data.Mail, {
        replaceZero: true,
      }),
      phone: this.parseString(data.Teléfono, {
        replaceZero: true,
      }),
      city: this.parseString(data.Ciudad, {
        replaceZero: true,
      }),
      ecommerceConnectId: this.ecommerceConnectId,
    };
  }
  protected async setUsers() {
    const usersIds = [...new Set(this.parsedResults.data.map(users => users.ID_Cliente))];
    this.users = (await this.sequelize.models.EcommerceUser.findAll({
      attributes: ['id', 'visitorId'],
      where: {
        ecommerceConnectId: this.ecommerceConnectId,
        visitorId: {
          [Op.in]: usersIds,
        },
      },
      raw: true,
    })) as EcommerceUser[];
  }

  protected async insert() {
    await this.setUsers();
    const newUsers = this.parsedResults.data.map(data => this.toEntity(data));
    // merge this.users with new users
    this.users.forEach(user => {
      const index = newUsers.findIndex(u => u.visitorId === user.visitorId);
      if (index > -1) {
        newUsers[index] = {
          ...user,
          ...newUsers[index],
        };
      }
    });

    await this.sequelize.models.EcommerceUser.bulkCreate(newUsers, {
      updateOnDuplicate: ['fullName', 'email', 'phone', 'city', 'ecommerceConnectId'],
      conflictAttributes: ['id'],
    });
    this.cleanUsers();
  }
}

export default CustomersTemplate;
