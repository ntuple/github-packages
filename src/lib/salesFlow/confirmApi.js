import axiosApiInstance from 'lib/services/interceptor';

class ConfirmApi {
  constructor(apiHost, product) {
    this.confirmationUrl = `${apiHost}/api/sales/${product}/confirmation`;
  }

  startConfirm(data) {
    return axiosApiInstance.request({
      method: 'post',
      url: this.confirmationUrl,
      data: { ...data },
    });
  }

  confirm(data) {
    return axiosApiInstance.request({
      method: 'post',
      url: `${this.confirmationUrl}/confirm`,
      data,
    });
  }
}

export default ConfirmApi;
