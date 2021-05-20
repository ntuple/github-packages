class PaymentService {
  constructor(api) {
    this.api = api;
  }

  get2c2pData() {
    return this.api
      .get2c2pData()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default PaymentService;
