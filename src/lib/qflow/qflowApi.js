import axiosApiInstance from 'lib/services/interceptor';

class QflowApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getQuestionFlow(qflowId) {
    return axiosApiInstance
      .request({
        method: 'get',
        url: `${this.apiUrl}/${qflowId}`,
      })
      .then((response) => {
        return response.data;
      });
  }

  getQuestionChoices(qflowId, question, answers) {
    return axiosApiInstance
      .request({
        method: 'get',
        url: `${this.apiUrl}/${qflowId}/choices/${question}`,
        params: answers,
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default QflowApi;
