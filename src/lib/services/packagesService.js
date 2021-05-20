class PackagesService {
  constructor(api) {
    this.api = api;
  }

  getPackages() {
    return this.api.getPackages().then((response) => {
      return response.data;
    });
  }
}

export default PackagesService;
