'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('EcommerceProducts', ['id', 'productId'], {
      unique: true,
      name: 'unique_index_on_id_and_productId',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('EcommerceProducts', 'unique_index_on_id_and_productId');
  },
};
