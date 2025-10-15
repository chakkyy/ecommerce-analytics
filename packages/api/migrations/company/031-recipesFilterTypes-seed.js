'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'RecipesFilterTypes',
      [
        {
          recipeId: 1, // Costos por transacción
          filterTypeId: 2, // Rango de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1, // Costos por transacción
          filterTypeId: 3, // Rango de costo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2, // Costos totales
          filterTypeId: 4, // Categoria
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2, // Costos totales
          filterTypeId: 3, // Rango de costo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 3, // Rentabilidad
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 4, // Revenue acumulado
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 5, // Valor del segmento
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 5, // Valor del segmento
          filterTypeId: 8, // Filtro de segmento
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 6, // Conversiones
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 7, // Número de páginas vistas
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 8, // Número de pedidos por vendedor
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 8, // Número de pedidos por vendedor
          filterTypeId: 7, // Filtro de vendedor
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 9, // Número de visitantes únicos
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 10, // Porcentaje de tráfico móvil
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 11, // Porcentaje de tráfico referido
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 12, // Tasa de abandono del carrito
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 13, // Tasa de clicks en el sitio
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 14, // Tasa de conversión de visitantes a clientes
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 15, // Tasa de rebote
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 16, // Tasa de satisfación del cliente
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 17, // Tiempo de permanencia en el sitio
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 18, // Tráfico en el sitio
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 19, // Avg Churn Rate
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 19, // Avg Churn Rate
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 20, // Avg Recency
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 20, // Avg Recency
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 21, // Tasa de clientes habituales
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 21, // Tasa de clientes habituales
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 22, // Tasa de conversión de la tienda
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 22, // Tasa de conversión de la tienda
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 23, // Ingreso medio por cliente
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 24, // Ingresos por segmento
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 24, // Ingresos por segmento
          filterTypeId: 8, // Filtro de segmento
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 25, // Ingresos por transacción
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 25, // Ingresos por transacción
          filterTypeId: 9, // Filtro de transacción
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 26, // Ingresos totales
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 27, // Tasa de conversión de clientes a compradores
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 28, // Cantidad de clientes por segmento
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 28, // Cantidad de clientes por segmento
          filterTypeId: 8, // Filtro de segmento
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 29, // Cantidad de órdenes
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 29, // Cantidad de órdenes
          filterTypeId: 8, // Filtro de segmento
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 30, // Avg Order Value
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 30, // Avg Order Value
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 31, // Avg Basket Size
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 31, // Avg Basket Size
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 32, // Avg Frecuency
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 32, // Avg Frecuency
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 33, // Avg Days to Second Order
          filterTypeId: 5, // Filtro de tiempo
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 33, // Avg Days to Second Order
          filterTypeId: 6, // Filtro de dato
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 34, // Tipo de producto
          filterTypeId: 1, // Sin Filtro
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RecipesFilterTypes', null, {});
  },
};
