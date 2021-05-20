import axiosApiInstance from 'lib/services/interceptor';
import axiosRetry from 'axios-retry';
import { getLanguage } from '../translation';

const leadRetryCondition = (error) => {
  return (
    error.code !== 'ECONNABORTED' &&
    (!error.response ||
      (error.response.status >= 500 && error.response.status <= 599) ||
      error.response.status === 401)
  );
};

class LeadsApi {
  constructor(apiHost, product) {
    this.leadUrl = `${apiHost}/api/sales/${product}/lead`;
  }

  saveLead(data) {
    axiosRetry(axiosApiInstance, {
      retries: 1,
      retryCondition: leadRetryCondition,
    });
    return axiosApiInstance.request({
      method: 'patch',
      url: this.leadUrl,
      ...(Boolean(
        typeof window !== 'undefined' &&
          window.Piwik?.getTracker().getVisitorId()
      ) && {
        headers: {
          'X-RF-Visitor-ID': window.Piwik?.getTracker().getVisitorId(),
        },
      }),
      data: {
        ...data,
        locale: getLanguage(),
      },
    });
  }

  getLead() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.leadUrl,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}

export default LeadsApi;
