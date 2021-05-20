import { expect, test } from '@jest/globals';
import SummaryTransformer from './orderSummaryTransformer';

const apiResponse = {
  customer_first_name: 'Test',
  package: {
    price: 2550,
    type: 'Type 2',
    insurance_company_en: 'Asia Insurance 1950 Co., Ltd',
    insurance_company_th: 'บริษัท เอเชียประกันภัย (1950) จำกัด (มหาชน)',
  },
  discount: {
    coupon: 0,
    discount: 0,
  },
  addons: {
    compulsory: 646,
  },
  payment: {
    installments: 6,
    payment_amount: 533,
  },
  subtotal: 3196,
  has_order: false,
  order_id: null,
  coupon: null,
};

const result = {
  customerName: 'Test',
  isOrder: false,
  orderId: null,
  coupon: null,
  package: {
    title: 'common:checkout.insurance_detail',
    label: 'บริษัท เอเชียประกันภัย (1950) จำกัด (มหาชน)\nType 2',
    value: '2,550',
  },
  payment: {
    title: 'common:checkout.payment',
    label: 'common:checkout.installment_period',
    value: 6,
  },
  total: {
    label: 'common:checkout.total_price_per_month',
    value: '533',
  },
  subTotal: {
    label: 'common:checkout.sub_total',
    value: '3,196',
  },
  discounts: {
    title: 'common:checkout.discounts',
    items: [],
  },
  addOns: {
    title: 'common:checkout.add_on',
    items: [
      {
        class: 'text-success',
        label: 'common:checkout.mandatory_insurance',
        packageName: 'บริษัท เอเชียประกันภัย (1950) จำกัด (มหาชน)',
        value: '646',
      },
    ],
  },
};
test('It should return the correct transformed object', () => {
  const summaryTransformer = new SummaryTransformer();
  expect(summaryTransformer.transformApiSummary(apiResponse)).toEqual(result);
});
