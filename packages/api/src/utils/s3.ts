import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new S3Client({
    region: process.env.AWS_SES_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(file, folder = '') {
    const nameWithTimestamp = `${folder}${Date.now()}-${file.originalname}`;

    return this.s3_upload(file.buffer, this.AWS_S3_BUCKET, nameWithTimestamp, file.mimetype);
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
    };

    try {
      const s3Response = await this.s3.send(new PutObjectCommand(params));
      return {
        // return url but encode it to be able to use it in the frontend
        url: encodeURI(`https://${bucket}.s3.amazonaws.com/${name}`),
        ...s3Response,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
