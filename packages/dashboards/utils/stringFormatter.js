export function parseOrderStatus(orderStatus) {
  let status = orderStatus;
  if (orderStatus.includes('ffmt')) {
    status = 'waiting-authorization';
  }
  const words = status.split('-');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}
