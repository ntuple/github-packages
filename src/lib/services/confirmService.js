import { normalizeAnswers } from '../questions';

const createdStatus = 201;

class ConfirmService {
  constructor(api) {
    this.api = api;
  }

  startConfirm(data) {
    return this.api.startConfirm(data).then((response) => {
      const { status } = response;

      return {
        success: status === createdStatus,
      };
    });
  }

  confirm(questions, answers) {
    const values = normalizeAnswers(answers, questions);

    return this.api.confirm(values).then((response) => {
      const { status } = response;

      return {
        success: status === createdStatus,
      };
    });
  }
}

export default ConfirmService;
