class PaymentFlowService {
  constructor(enableVoucher, enableInstallment) {
    this.enableVoucher = enableVoucher;
    this.enableInstallment = enableInstallment;
  }

  initialShow(part) {
    switch (part) {
      case 'voucher':
        return this.enableVoucher;
      case 'installment':
        return !this.enableVoucher && this.enableInstallment;
      case 'summary':
        return !this.enableVoucher && !this.enableInstallment;
      default:
        return false;
    }
  }

  calculateSteps() {
    let currentStep = 1;

    const steps = {
      voucher: null,
      installment: null,
      summary: null,
    };

    if (this.enableVoucher) {
      steps.voucher = currentStep;
      currentStep += 1;
    }

    if (this.enableInstallment) {
      steps.installment = currentStep;
      currentStep += 1;
    }

    steps.summary = currentStep;

    return steps;
  }
}

export default PaymentFlowService;
