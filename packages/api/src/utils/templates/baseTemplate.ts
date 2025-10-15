import { parse, ParseResult } from 'papaparse';
import { Sequelize } from 'sequelize';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { EcommerceStore } from '../../models/company/ecommerceStore.entity';
import { parse as dateFnsParseDate, isMatch } from 'date-fns';

class BaseTemplate<T> {
  protected sequelize: Sequelize | null = null;
  protected ecommerceConnectId: number;
  protected parsedResults: ParseResult<T>;
  protected headers: (keyof T)[];
  protected csv: any;
  protected isValid = false;
  protected stores: EcommerceStore[];
  protected users: Partial<EcommerceUser>[] = [];

  constructor(sequelize: Sequelize, ecommerceConnectId: number, csv: any) {
    this.sequelize = sequelize;
    this.ecommerceConnectId = ecommerceConnectId;
    this.csv = csv.toString();
    this.headers = [] as (keyof T)[];
  }

  async parse() {
    await new Promise((resolve, reject) => {
      parse<T>(this.csv, {
        header: true,
        skipEmptyLines: true,
        chunk: async (results, parser) => {
          this.parsedResults = results;

          this.validateHeaders();

          if (!this.isValid) {
            console.log('Invalid headers');
            parser.abort();

            return;
          }

          parser.pause();
          try {
            await this.insert();
          } catch (error) {
            console.log(`Error inserting chunk ${results.meta.cursor}`, error);
          }

          console.log(`Inserted chunk of ${results.data.length} rows`);

          parser.resume();
        },
        chunkSize: 1024 * 1024 * 0.1, // 100kb. This is aprox 2000 rows
        complete: results => {
          resolve(results);
        },
        error: error => {
          console.log('There was an error inserting chunk', error);
          reject(error);
        },
      });
    });

    return this;
  }

  protected setHeaders(headers: (keyof T)[]) {
    this.headers = headers;

    return this;
  }

  protected validateHeaders() {
    // If the headers are already valid, return
    if (this.isValid) {
      return this;
    }

    const isValid = this.parsedResults.meta.fields.every(field => {
      return this.headers.includes(field as keyof T);
    });

    this.isValid = isValid;

    console.log('Headers are valid!');

    return this;
  }

  protected parseNumber(
    value: string,
    type: 'int' | 'float' = 'int',
    defaultNumber?: number,
    omitLetters = true
  ): number | null {
    if (omitLetters) {
      value = value.replace(/[^0-9.,]/g, '');
    }
    const parser = type === 'int' ? parseInt : parseFloat;

    return Number.isNaN(Number(value)) || Number.isNaN(parseInt(value)) || Number.isNaN(parseFloat(value))
      ? defaultNumber || null
      : parser(value);
  }

  protected parseString(
    value: string,
    options?: {
      replaceZero?: boolean;
      omitLeadingZero?: boolean;
    }
  ): string {
    value = String(value);
    value = value.replace(/['"]+/g, '');

    // Not sure why we're doing this, the CSV should be clean from the customer but we'll keep it for now
    if (value.includes(' .') || value === '.') {
      value = value.replace(' .', '').trim();
      value = value.replace('.', '');
    }
    // Same as above, we should be getting a clean CSV
    if (value === '0' && options?.replaceZero) {
      value = '';
    }

    if (options?.omitLeadingZero) {
      value = String(this.parseNumber(value, 'int', null, false)?.toString() || '' || value);
    }

    return value;
  }

  protected parseDate(date: string): Date | null {
    const [fullDate, onlyDate, dateWithSlashes] = ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd', 'dd/MM/yyyy'];

    if (isMatch(date, fullDate)) {
      return dateFnsParseDate(date, fullDate, new Date());
    }
    if (isMatch(date, onlyDate)) {
      return dateFnsParseDate(date, onlyDate, new Date());
    }
    if (isMatch(date, dateWithSlashes)) {
      return dateFnsParseDate(date, dateWithSlashes, new Date());
    }
    return null;
  }

  protected async setStores() {
    this.stores = (await this.sequelize.models.EcommerceStore.findAll({
      where: {
        ecommerceConnectId: this.ecommerceConnectId,
      },
      raw: true,
    })) as EcommerceStore[];
  }

  protected findStoreId(storeName: string): number | null {
    return this.stores.find(store => store.ecommerceStoreId == storeName)?.id || null;
  }

  protected findUserId(userId: string): number | null {
    return this.users.find(user => user.visitorId === userId)?.id || null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected toEntity(_: T): Partial<any> {
    throw new Error('Not implemented');
  }

  protected async insert() {
    throw new Error('Not implemented');
  }

  protected cleanUsers() {
    this.users = [];
  }
}

export default BaseTemplate;
