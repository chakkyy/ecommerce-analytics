import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { Op } from 'sequelize';
import { Repository } from 'sequelize-typescript';

export interface GACredentialType {
  client_email: string;
  private_key: string;
  property_id: number;
}

export const processGACredentials = async (
  ecommerceConnectId: number,
  ecommerceCredentialRepository: Repository<EcommerceCredential>
): Promise<GACredentialType> => {
  const credentialsRows = await ecommerceCredentialRepository.findAll<EcommerceCredential>({
    attributes: ['keyType', 'keyValue'],
    where: {
      ecommerceConnectId,
      keyType: {
        [Op.in]: ['ga_client_email', 'ga_private_key', 'ga_property_id'],
      },
    },
    raw: true,
  });

  const credentials = {
    client_email: '',
    private_key: '',
    property_id: 0,
  };

  if (credentialsRows.length == 0) return credentials;

  credentialsRows.forEach(row => {
    if (row.keyType == 'ga_client_email') {
      credentials.client_email = row.keyValue;
    } else if (row.keyType == 'ga_private_key') {
      credentials.private_key = row.keyValue.split(String.raw`\n`).join('\n');
    } else if (row.keyType == 'ga_property_id') {
      credentials.property_id = Number(row.keyValue);
    }
  });

  return credentials;
};
