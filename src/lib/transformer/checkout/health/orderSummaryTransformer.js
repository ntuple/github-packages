import transformSummary from './transformSummary';
import transformDetails from '../../packages/health/transformDetails';
import { getLanguage } from '../../../translation';

class OrderSummaryTransformer {
  transformApiSummary(apiSummary) {
    const lang = getLanguage();
    const summary = transformSummary(apiSummary, lang);
    const { subCategory } = apiSummary?.package;
    return {
      customerName: apiSummary.customer_data.customer_first_name,
      isOrder: apiSummary.has_order,
      orderId: apiSummary.order_id ?? null,
      additionalInfo: apiSummary.package?.product?.additionalInfo
        ? apiSummary.package?.product?.additionalInfo[lang]
        : null,
      coupon: null,
      packageDetails: transformDetails(apiSummary.package, subCategory, lang),
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
