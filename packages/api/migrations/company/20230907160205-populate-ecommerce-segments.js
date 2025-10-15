'use strict';

const DEFAULT_SEGMENTS = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    description:
      '{"es":"Usuarios que han hecho compras más recientes, con mayor frecuencia y con alto monto según el promedio de los clientes","en":"Users who have visited most recently, visited most frequently, and spent the most, based on average customer behavior.","pt":"Usuários que fizeram compras mais recentemente, com maior frequência e com um valor mais alto, com base na média do comportamento dos clientes."}',
    name: '{"es":"Clientes ideales","en":"Ideal Customers","pt":"Cliente ideal"}',
    rfm: [555, 554, 544, 545, 454, 455, 445],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Clientes fieles","en":"Engaged Customers","pt":"Clientes engajados"}',
    description:
      '{"es":"Usuarios que están un paso por debajo del IDEAL pero han visitado recientemente, con frecuencia y han gastado una cantidad significativa.","en":"Users who are one step below IDEAL but have visited recently, frequently, and spent a significant amount.","pt":"Usuários que estão um passo abaixo do IDEAL, mas que visitaram recentemente, com frequência e gastaram uma quantidade significativa."}',
    rfm: [543, 444, 435, 355, 354, 345, 344, 335],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Potenciales leales","en":"Potential Loyalists","pt":"Com Potencial"}',
    description:
      '{"es":"Un usuario reciente, que gastó una cantidad significativa, pero necesita más persuasión. Puede convertirse en Cliente Fiel.","en":"A recent user, who spent a significant amount, but needs more convincing. Can become Engaged.","pt":"Um usuário recente, que gastou uma quantidade significativa, mas precisa de mais convencimento. Pode se engajar."}',
    rfm: [
      533, 551, 552, 541, 542, 533, 532, 531, 452, 451, 442, 441, 431, 453, 433, 432, 423, 353, 352, 351, 342, 341, 333,
      323,
    ],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Clientes recientes","en":"Recent Users","pt":"Cliente recente"}',
    description:
      '{"es":"Usuarios que han realizado compras más recientemente, poca información sobre frecuencia o baja frecuencia, y no han gastado mucho.","en":"Users who purchased most recently, few information about frequency or poor frequency, and have not spent much.","pt":"Usuários que fizeram compras mais recentemente, poucas informações sobre frequência ou baixa frequência, e não gastaram muito."}',
    rfm: [512, 511, 422, 421, 412, 411, 311],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Promesas","en":"Promising","pt":"Promissor"}',
    description:
      '{"es":"Potencialmente leales, algunas semanas atrás. Gastan frecuentemente y una buena cantidad de dinero. Sin embargo, la última compra fue hace varias semanas.","en":"Potential loyalist a few months ago. Spends frequently and a good amount. But the last purchase was several weeks ago.","pt":"Potencialmente engajados há algumas semanas. Eles gastam com frequência e uma boa quantia. No entanto, a última compra foi feita várias semanas atrás."}',
    rfm: [525, 524, 523, 522, 521, 515, 514, 513, 425, 424, 413, 414, 415, 315, 314, 313],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Necesitan atención","en":"Needs Attention","pt":"Precisa de atenção"}',
    description:
      '{"es":"Usuarios han gastado una buena cantidad y con alguna frecuencia, pero hace buen tiempo no han regresado a comprar.","en":"User has been spending a substantial amount and visiting regularly in the past, but there has been a recent decrease in their visits.","pt":"Os usuários gastaram uma quantidade significativa, mas faz muito tempo que não fazem uma compra."}',
    rfm: [535, 534, 443, 434, 343, 334, 325, 324],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"En riesgo","en":"Can\'t Lose Them","pt":"Não podemos perdê-los"}',
    description:
      '{"es":"El usuario ha gastado una cantidad significativa, las visitas eran frecuentes, pero ha pasado mucho tiempo sin realizar alguna compra.","en":"The user has spent a significant amount of money, visited frequently, but it has been a long time since their last purchase.","pt":"O usuário gastou uma quantia significativa, as visitas eram frequentes, mas passou muito tempo sem realizar uma compra."}',
    rfm: [255, 254, 245, 244, 253, 252, 243, 242, 235, 234, 225, 224, 153, 152, 145, 143, 142, 135, 134, 133, 125, 124],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"A punto de perderse","en":"About To be lost","pt":"Prestes a ser perdido"}',
    description:
      '{"es":"Por debajo de la media en recencia, frecuencia y valor monetario. Si no los reactivas, los perderás.","en":"! Below-average recency, frequency, and monetary values. If you don\'t reactivate them, you will lose them.","pt":"Valores abaixo da média de recência, frequência e monetários. Se você não reativá-los, você os perderá."}',
    rfm: [331, 321, 312, 221, 213],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Posibles cazadores de ofertas","en":"Hunt dealers","pt":"Possível caça de ofertas"}',
    description:
      '{"es":"El usuario ha gastado una gran cantidad, pero sus visitas no eran frecuentes y no ha visitado desde hace mucho tiempo.","en":"The user has spent a significant amount, some visits were frequent, and they haven\'t visited in a long time.","pt":"O usuário gastou uma grande quantidade, algumas visitas foram frequentes e ele não visita há muito tempo."}',
    rfm: [155, 154, 144, 214, 215, 115, 114, 113],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Esporádicos","en":"Occasional","pt":"Esporádicos"}',
    description:
      '{"es":"Los clientes que solían realizar compras pequeñas e infrecuentes y no han comprado nada en mucho tiempo están por debajo de la media.","en":"Customers who used to make smaller and infrequent purchases and haven\'t purchased anything in a long time or below the average.","pt":"Os clientes que costumavam fazer compras menores e infrequentes e não compraram nada há muito tempo estão abaixo da média."}',
    rfm: [332, 322, 231, 241, 251, 233, 232, 223, 222, 132, 123, 122, 212, 211],
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '{"es":"Perdidos","en":"Lost","pt":"Perdidos"}',
    description:
      '{"es":"Los usuarios tienen las puntaciones más bajas en recencia, frecuencia y montos de compra. Realizaron su última compra hace mucho tiempo, no hemos pidido engancharlos.","en":"Lowest recency, frequency, and monetary scores/ Made last purchase long time ago and didn\'t engage at all.","pt":"Os usuários possuem as pontuações mais baixas em recência, frequência e valor de compras. Eles fizeram sua última compra há muito tempo e não conseguimos envolvê-los."}',
    rfm: [111, 112, 121, 131, 141, 151],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EcommerceSegments', DEFAULT_SEGMENTS, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EcommerceSegments', null, {});
  },
};
