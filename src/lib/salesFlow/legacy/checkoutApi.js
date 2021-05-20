import axiosApiInstance from 'lib/services/interceptor';

import { getLanguage } from '../../translation';

class CheckoutApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  startCheckout(data) {
    return axiosApiInstance.request({
      method: 'post',
      url: `${this.apiUrl}/start`,
      data: { ...data, locale: getLanguage() },
    });
  }

  getSummary() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.apiUrl,
    });
  }

  saveVoucher(data) {
    return axiosApiInstance.request({
      method: 'patch',
      url: `${this.apiUrl}/voucher`,
      data,
    });
  }

  getPaymentOptions() {
    return axiosApiInstance.request({
      method: 'get',
      url: `${this.apiUrl}/payment-options`,
    });
  }

  applyInstallment(data) {
    return axiosApiInstance.request({
      method: 'patch',
      url: `${this.apiUrl}/installment`,
      data,
    });
  }

  saveDetails(data) {
    // axiosRetry(axios, { retries: 1, retryCondition: leadRetryCondition });
    return axiosApiInstance.request({
      method: 'patch',
      url: `${this.apiUrl}/details`,
      data: { ...data, locale: getLanguage() },
    });
  }
}

export default CheckoutApi;
