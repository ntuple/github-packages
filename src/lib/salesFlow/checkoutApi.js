import axiosApiInstance from 'lib/services/interceptor';
import { getLanguage } from '../translation';

class CheckoutApi {
  constructor(apiHost, product) {
    this.checkoutUrl = `${apiHost}/api/sales/${product}/checkout`;
  }

  startCheckout(data) {
    return axiosApiInstance.request({
      method: 'post',
      url: this.checkoutUrl,
      data: { ...data },
    });
  }

  getSummary() {
    return axiosApiInstance.request({
      method: 'get',
      url: `${this.checkoutUrl}/summary`,
    });
  }

  saveVoucher(data) {
    return axiosApiInstance.request({
      method: 'patch',
      url: `${this.checkoutUrl}/voucher`,
      data,
    });
  }

  getPaymentOptions() {
    return axiosApiInstance.request({
      method: 'get',
      url: `${this.checkoutUrl}/payment-options`,
    });
  }

  applyInstallment(data) {
    return axiosApiInstance.request({
      method: 'patch',
      url: `${this.checkoutUrl}/installment`,
      data,
    });
  }

  saveDetails(data) {
    // axiosRetry(axios, { retries: 1, retryCondition: leadRetryCondition });
    return axiosApiInstance.request({
      method: 'patch',
      url: this.checkoutUrl,
      data: {
        ...data,
        locale: getLanguage(),
      },
    });
  }
}

export default CheckoutApi;
