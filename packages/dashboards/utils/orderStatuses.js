const successStatuses = [
  'approved',
  'invoiced',
  'shipped',
  'delivered',
];

const waitingStatuses = [
  'payment-pending',
  'waiting-for-seller',
  'ready-for-handling',
  'window-to-cancel',
  'handling',
];

export function getStatus(status) {
  if (successStatuses.includes(status)) {
    return 'success';
  } else if (waitingStatuses.includes(status) || status.includes('waiting')) {
    return 'waiting';
  } else if (status.includes('cancel')) {
    return 'error';
  } else {
    return 'default';
  }
}
