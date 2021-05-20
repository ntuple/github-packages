import axiosApiInstance from 'lib/services/interceptor';

class PaymentApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get2c2pData() {
    return axiosApiInstance.request({
      method: 'post',
      url: this.apiUrl,
    });
  }
}

export default PaymentApi;
