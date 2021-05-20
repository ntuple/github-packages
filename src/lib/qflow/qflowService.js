import QflowApi from './qflowApi';

class QflowService {
  constructor() {
    this.api = new QflowApi(process.env.NEXT_PUBLIC_QFLOW_API);
  }

  getInitialFlow(flowId) {
    return this.api.getQuestionFlow(flowId);
  }

  getRelevantQuestions(question, flow) {
    const { questions } = flow;

    if (!questions[question]) {
      return [];
    }

    const { order, dynamic_fetch: group } = questions[question];
    const relevantQuestions = [];

    Object.keys(questions).forEach((key) => {
      const currentQuestion = questions[key];
      if (
        currentQuestion.dynamic_fetch === group &&
        currentQuestion.order < order
      ) {
        relevantQuestions.push(key);
      }
    });

    return relevantQuestions;
  }

  getQuestionPatch(flowId, question, flow, answers) {
    const relevantQuestions = this.getRelevantQuestions(question, flow);

    const relevantAnswers = {};
    relevantQuestions.forEach((questionKey) => {
      relevantAnswers[questionKey] = answers[questionKey];
    });
    return this.api.getQuestionChoices(flowId, question, relevantAnswers);
  }
}

export default QflowService;
