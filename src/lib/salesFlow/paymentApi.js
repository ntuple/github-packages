import axiosApiInstance from 'lib/services/interceptor';
import { getLanguage } from '../translation';

class PaymentApi {
  constructor(apiHost, product) {
    this.apiUrl = `${apiHost}/api/sales/${product}/payment`;
  }

  get2c2pData() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.apiUrl,
      headers: { 'X-RF-Language': getLanguage() },
    });
  }
}

export default PaymentApi;
