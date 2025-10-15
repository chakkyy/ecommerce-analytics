export const successStatuses = ['approved', 'invoiced', 'shipped', 'delivered'];

export const waitingStatuses = [
  'payment-pending',
  'waiting-for-seller',
  'ready-for-handling',
  'cancel-payment-pending',
  'window-to-cancel',
  'handling',
  'payment-approved',
];

export const errorStatuses = ['cancel-requested', 'cancel-accepted', 'cancel-denied', 'canceled'];

export const VTEX_STATUSES = [
  ...successStatuses,
  waitingStatuses[1],
  waitingStatuses[2],
  waitingStatuses[4],
  waitingStatuses[5],
  waitingStatuses[6],
];
