import LeadApi from './leadApi';
import CheckoutApi from './checkoutApi';
import OrderApi from './orderApi';
import PackagesApi from './packagesApi';
import PaymentApi from './paymentApi';
import ConfirmApi from './confirmApi';
import LegacyLeadsApi from './legacy/leadsApi';
import LegacyPackagesApi from './legacy/packagesApi';
import LegacyPaymentApi from './legacy/paymentApi';
import LegacyCheckoutApi from './legacy/checkoutApi';
import LegacyOrderApi from './legacy/orderApi';

class SalesFlowFactory {
  constructor(product = null, apiUrls = {}) {
    this.product = product;
    this.apiUrls = apiUrls;
    this.baseUrl = process.env.NEXT_PUBLIC_API_HOST;
  }

  getLeadsApi() {
    if (!this.product) {
      return new LegacyLeadsApi(this.baseUrl + this.apiUrls.leadsApiUrl);
    }

    return new LeadApi(this.baseUrl, this.product);
  }

  getCheckoutApi() {
    if (!this.product) {
      return new LegacyCheckoutApi(this.baseUrl + this.apiUrls.checkoutApiUrl);
    }

    return new CheckoutApi(this.baseUrl, this.product);
  }

  getOrderApi() {
    if (!this.product) {
      return new LegacyOrderApi(
        `${this.baseUrl}${this.apiUrls.checkoutApiUrl}/order-summary`
      );
    }

    return new OrderApi(this.baseUrl, this.product);
  }

  getPackagesApi() {
    if (!this.product) {
      return new LegacyPackagesApi(this.baseUrl + this.apiUrls.packagesApiUrl);
    }

    return new PackagesApi(this.baseUrl, this.product);
  }

  getPaymentApi() {
    if (!this.product) {
      return new LegacyPaymentApi(this.baseUrl + this.apiUrls.checkoutApiUrl);
    }

    return new PaymentApi(this.baseUrl, this.product);
  }

  getConfirmApi() {
    // if (!this.product) {
    //   return new ConfirmApi(this.baseUrl + this.apiUrls.confirmApiUrl);
    // } // need to add legacy support
    return new ConfirmApi(this.baseUrl, this.product);
  }
}

export default SalesFlowFactory;
