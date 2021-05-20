class OrderService {
  constructor(api) {
    this.api = api;
  }

  getSummary() {
    return this.api.getSummary().then((response) => {
      return response.data;
    });
  }
}

export default OrderService;
