import axiosApiInstance from 'lib/services/interceptor';

class PackagesApi {
  constructor(apiHost, product) {
    this.apiUrl = `${apiHost}/api/sales/${product}/packages`;
  }

  getPackages() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.apiUrl,
    });
  }
}

export default PackagesApi;
