import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

dotenv.config();
const s3 = new S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

@Injectable()
export class FileUploadService {
  async uploadFile(dataBuffer: Buffer, fileName: string): Promise<S3.ManagedUpload.SendData> {
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Body: dataBuffer,
        Key: fileName,
      })
      .promise();

    return uploadResult;
  }
}
