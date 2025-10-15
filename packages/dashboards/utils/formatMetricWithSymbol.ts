function formatMetricWithSymbol(recipeName: string, metricNumber: number | string): string {
  const symbolMap: Record<string, string> = {
    TOTAL_REVENUE: '$',
    AVERAGE_ORDER_VALUE: '$',
    STORE_AVERAGE_TICKET: '$',
    STORE_GROSS_MARGIN: '$',
    STORE_CONVERSION_RATE: '%',
    STORE_DISTRIBUTION_COST: '$',
    STORE_ORDERS_TOTAL_NET: '$',
    TRANSACTION_REVENUE: '$',
    NUMBER_OF_PAGE_VIEWED: '',
    CART_ABANDONMENT_RATE: '%',
    REFERRED_TRAFFIC_PERCENTAGE: '%',
    CUSTOMER_SATISFACTION_RATE: '%',
    BOUNCE_RATE: '%',
    NUMBER_OF_UNIQUE_VISITORS: '',
    STORE_PRODUCT_RETURN_RATE: '%',
    STORE_DISCOUNT_RATE: '%',
    STORE_STOCK_DEPLETION_RATE: '%',
    STORE_NET_PROFITABILITY: '%',
    STORE_SQUARE_METER_SALES: '$',
  };

  const symbol = symbolMap[recipeName] || '';

  return symbol === '$' ? `${symbol}${metricNumber}` : `${metricNumber}${symbol}`;
}

export default formatMetricWithSymbol;

export const getTranslationFromLabel = (json: string, languageKey: string) => {
  try {
    const parsedJson = JSON.parse(json);
    if (!parsedJson?.[languageKey]) return '';

    return parsedJson[languageKey];
  } catch (e) {
    return '';
  }
};
