import { Lambda, config } from 'aws-sdk';
import axios from 'axios';

export const LAMBDA_CONFIG: Record<
  'updateOrders' | 'uploadFiles',
  {
    key: string;
    url: string;
    name: string;
  }
> = {
  updateOrders: {
    key: 'updateOrders',
    name: `ecommerce-${process.env.ecommerce_ENV}-updateOrders`,
    url: `${process.env.LAMBDA_URL}updateVtexOrders`,
  },
  uploadFiles: {
    key: 'uploadFiles',
    name: `ecommerce-${process.env.ecommerce_ENV}-uploadFiles`,
    url: `${process.env.LAMBDA_URL}uploadFiles`,
  },
};

const invokeLambda = (lambda, params) =>
  new Promise((resolve, reject) => {
    lambda.invoke(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

export const invoke = async (lambdaKey: string, payload: { body: { [key: string]: string | number } }) => {
  if (process.env.RUN_LOCAL_LAMBDA_PROCESS === 'true') {
    return axios.post(LAMBDA_CONFIG[lambdaKey].url, payload.body);
  }

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: 'us-east-1',
  });

  const lambda = new Lambda();

  const params = {
    FunctionName: LAMBDA_CONFIG[lambdaKey].name,
    Payload: JSON.stringify(payload),
  };

  return invokeLambda(lambda, params);
};
