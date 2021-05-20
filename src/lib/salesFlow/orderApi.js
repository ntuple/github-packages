import CheckoutApi from './checkoutApi';

class OrderApi {
  constructor(apiHost, product) {
    this.checkoutApi = new CheckoutApi(apiHost, product);
  }

  getSummary() {
    // For now this is just the same endpoint as checkout summary
    return this.checkoutApi.getSummary();
  }
}

export default OrderApi;
