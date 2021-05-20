import axiosApiInstance from 'lib/services/interceptor';

class PackagesApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getPackages() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.apiUrl,
    });
  }
}

export default PackagesApi;
