import axiosApiInstance from 'lib/services/interceptor';

class OrderApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getSummary() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.apiUrl,
    });
  }
}

export default OrderApi;
