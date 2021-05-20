import transformSummary from './transformSummary';
import { getLanguage } from '../../../translation';

class OrderSummaryTransformer {
  transformApiSummary(apiSummary) {
    const lang = getLanguage();
    const summary = transformSummary(apiSummary, lang);
    return {
      customerName: apiSummary.customer_first_name,
      isOrder: apiSummary.has_order,
      orderId: apiSummary.order_id ?? null,
      coupon: apiSummary.coupon_code ?? null,
      package: summary.packageDetails,
      addOns: summary.addOns,
      discounts: summary.discounts,
      payment: summary.payment,
      total: summary.total,
      subTotal: summary.subTotal,
    };
  }
}

export default OrderSummaryTransformer;
