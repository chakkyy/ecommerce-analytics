import { Process, Processor } from '@nestjs/bull';
import { S3 } from 'aws-sdk';
import { Job } from 'bull';
import { getConnection } from '../modules/tenant/tenant.module';
import BaseTemplate from '../utils/templates/baseTemplate';
import CustomersTemplate from '../utils/templates/customersTemplate';
import ProductsTemplate from '../utils/templates/productsTemplate';
import SalesTemplate from '../utils/templates/salesTemplate';
import StoresTemplate from '../utils/templates/storesTemplate';
import { unzipFile } from '@utils/zip';

const s3 = new S3({
  region: 'us-east-1',
});

type TemplateType = 'sales' | 'products' | 'stores' | 'customers';

const parserConfig: Record<TemplateType, typeof BaseTemplate<any>> = {
  sales: SalesTemplate,
  products: ProductsTemplate,
  stores: StoresTemplate,
  customers: CustomersTemplate,
};

@Processor('uploadFiles')
export class UploadFilesConsumer {
  @Process({
    concurrency: 100,
  })
  async uploadFiles(
    job: Job<{
      filename: string;
      ecommerceConnectId: number;
      database: string;
      template: 'sales' | 'products' | 'stores' | 'customers';
      zip?: boolean;
    }>
  ) {
    let sequelize: any | null = null;

    try {
      const { filename, ecommerceConnectId, database, template } = job.data;

      if (!template || !ecommerceConnectId) {
        throw new Error('Missing parameters');
      }

      sequelize = await getConnection({ database });

      const params = { Bucket: process.env.AWS_S3_BUCKET, Key: filename };

      const file = await new Promise<S3.GetObjectOutput>((accept, reject) => {
        s3.getObject(params, function (err, data) {
          if (err) {
            reject(err);
          } else {
            accept(data);
          }
        });
      });

      let content = file.Body;
      if (job.data.zip) {
        content = await unzipFile(file.Body);
      }

      const parser = new parserConfig[template](sequelize, ecommerceConnectId, content);

      await parser?.parse();

      console.log(`Finished parsing template ${template}`);

      return {
        message: 'The file was successfully processed',
      };
    } catch (error) {
      console.log('Error processing file', error);

      if (sequelize) {
        await sequelize.close();
      }
    }
  }
}
