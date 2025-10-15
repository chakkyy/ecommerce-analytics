import { BetaAnalyticsDataClient, protos } from '@google-analytics/data';
import { processGACredentials, GACredentialType } from '@utils/gAnalytics';
import { format } from 'date-fns';
import { Repository } from 'sequelize-typescript';
import { EcommerceCredential } from '../models/company/ecommerceCredential.entity';

export async function generateReport(
  credentials: any,
  payload: any
): Promise<protos.google.analytics.data.v1beta.IRunReportResponse> {
  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });

    const [response] = await analyticsDataClient.runReport(payload);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getGAMetric(
  ecommerceConnectId: number,
  startDate: Date,
  endDate: Date,
  args: any,
  ecommerceCredentialRepository: Repository<EcommerceCredential>
): Promise<number> {
  const credentials: GACredentialType = await processGACredentials(ecommerceConnectId, ecommerceCredentialRepository);
  const { client_email, private_key, property_id } = credentials;

  if (property_id == 0) return 0;

  const payload = {
    property: `properties/${property_id}`,
    dateRanges: [
      {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
      },
    ],
    ...args,
  };

  try {
    const report: protos.google.analytics.data.v1beta.IRunReportResponse = await generateReport(
      {
        client_email,
        private_key,
      },
      payload
    );
    let output = 0;
    report.rows.forEach(row => {
      if (row.dimensionValues.length > 0) {
        if (row.dimensionValues[0].value == 'Referral') {
          output = Number(row.metricValues[0].value);
        }
      } else {
        output = Number(row.metricValues[0].value);
      }
    });
    return output;
  } catch (err) {
    console.error(err);
    return 0;
  }
}
