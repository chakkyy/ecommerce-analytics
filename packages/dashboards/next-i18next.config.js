const path = require('path');

module.exports = {
  defaultNS: 'index',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    localePath: path.resolve('./public/locales'),
  },
  fallbackLng: {
    default: ['es'],
  },
};
