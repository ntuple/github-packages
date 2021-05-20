import { normalizeAnswers } from '../questions';

class CheckoutService {
  constructor(api) {
    this.api = api;
  }

  saveDetails(questions, answers) {
    const values = normalizeAnswers(answers, questions);

    return this.api
      .saveDetails(values)
      .then((response) => {
        return response.data;
      })
      .then(() => {
        return {
          success: true,
        };
      });
  }

  startCheckout(data) {
    return this.api.startCheckout(data).then((response) => {
      const { data, status } = response;

      const checkoutStatus = {
        success: status === 201,
      };

      // Legacy Support
      if (data.checkout_page_url) {
        checkoutStatus.success = true;
        checkoutStatus.redirect_to = data.checkout_page_url;
      }

      return checkoutStatus;
    });
  }

  getSummary() {
    return this.api.getSummary().then((response) => {
      return response.data;
    });
  }

  saveVoucher(data) {
    return this.api
      .saveVoucher(data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  getPaymentOptions() {
    return this.api
      .getPaymentOptions()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  applyInstallment(data) {
    return this.api
      .applyInstallment(data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default CheckoutService;
