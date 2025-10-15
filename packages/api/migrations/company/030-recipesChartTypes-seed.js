'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'RecipesChartTypes',
      [
        {
          recipeId: 1, // Costos por transacción
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1, // Costos por transacción
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2, // Costos totales
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2, // Costos totales
          chartTypeId: 3, // Grafico de torta
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 3, // Rentabilidad
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 3, // Rentabilidad
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 4, // Revenue acumulado
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 4, // Revenue acumulado
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 4, // Revenue acumulado
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 5, // Valor del segmento
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 5, // Valor del segmento
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 5, // Valor del segmento
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 6, // Conversiones
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 6, // Conversiones
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 7, // Número de páginas vistas
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 7, // Número de páginas vistas
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 8, // Número de pedidos por vendedor
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 8, // Número de pedidos por vendedor
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 8, // Número de pedidos por vendedor
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 9, // Número de visitantes únicos
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 9, // Número de visitantes únicos
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 10, // Porcentaje de tráfico móvil
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 10, // Porcentaje de tráfico móvil
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 11, // Porcentaje de tráfico referido
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 11, // Porcentaje de tráfico referido
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 12, // Tasa de abandono del carrito
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 12, // Tasa de abandono del carrito
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 12, // Tasa de abandono del carrito
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 13, // Tasa de clicks en el sitio
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 13, // Tasa de clicks en el sitio
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 13, // Tasa de clicks en el sitio
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 14, // Tasa de conversión de visitantes a clientes
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 14, // Tasa de conversión de visitantes a clientes
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 14, // Tasa de conversión de visitantes a clientes
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 15, // Tasa de rebote
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 15, // Tasa de rebote
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 15, // Tasa de rebote
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 16, // Tasa de satisfación del cliente
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 16, // Tasa de satisfación del cliente
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 16, // Tasa de satisfación del cliente
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 17, // Tiempo de permanencia en el sitio
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 17, // Tiempo de permanencia en el sitio
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 17, // Tiempo de permanencia en el sitio
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 18, // Tráfico en el sitio
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 18, // Tráfico en el sitio
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 18, // Tráfico en el sitio
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 19, // Avg Churn Rate
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 19, // Avg Churn Rate
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 19, // Avg Churn Rate
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 20, // Avg Recency
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 20, // Avg Recency
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 20, // Avg Recency
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 21, // Tasa de clientes habituales
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 21, // Tasa de clientes habituales
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 21, // Tasa de clientes habituales
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 22, // Tasa de conversión de la tienda
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 22, // Tasa de conversión de la tienda
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 22, // Tasa de conversión de la tienda
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 23, // Ingreso medio por cliente
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 24, // Ingresos por segmento
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 24, // Ingresos por segmento
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 25, // Ingresos por transacción
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 25, // Ingresos por transacción
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 25, // Ingresos por transacción
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 26, // Ingresos totales
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 26, // Ingresos totales
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 26, // Ingresos totales
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 27, // Tasa de conversión de clientes a compradores
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 27, // Tasa de conversión de clientes a compradores
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 27, // Tasa de conversión de clientes a compradores
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 28, // Cantidad de clientes por segmento
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 28, // Cantidad de clientes por segmento
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 28, // Cantidad de clientes por segmento
          chartTypeId: 3, // Grafico de torta
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 29, // Cantidad de órdenes
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 29, // Cantidad de órdenes
          chartTypeId: 4, // Grafico de columnas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 29, // Cantidad de órdenes
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 30, // Avg Order Value
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 30, // Avg Order Value
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 30, // Avg Order Value
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 31, // Avg Basket Size
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 31, // Avg Basket Size
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 31, // Avg Basket Size
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 32, // Avg Frecuency
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 32, // Avg Frecuency
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 32, // Avg Frecuency
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 33, // Avg Days to Second Order
          chartTypeId: 1, // KPI
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 33, // Avg Days to Second Order
          chartTypeId: 5, // Grafico de barras
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 33, // Avg Days to Second Order
          chartTypeId: 2, // Grafico de lineas
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 34, // Tipo de producto
          chartTypeId: 3, // Grafico de Torta
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 56, // GA Usuarios visitantes
          chartTypeId: 1, // KPI GA
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 57, // GA Sesiones
          chartTypeId: 1, // KPI GA
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 58, // GA Sesiones por referido
          chartTypeId: 1, // KPI GA
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 59, // GA Usuarios que facturaron
          chartTypeId: 1, // KPI GA
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RecipesChartTypes', null, {});
  },
};
