import axiosApiInstance from 'lib/services/interceptor';
import axiosRetry from 'axios-retry';
import { getLanguage } from '../../translation';

const leadRetryCondition = (error) => {
  return (
    error.code !== 'ECONNABORTED' &&
    (!error.response ||
      (error.response.status >= 500 && error.response.status <= 599) ||
      error.response.status === 401)
  );
};

class LeadsApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  saveLead(data) {
    axiosRetry(axiosApiInstance, {
      retries: 1,
      retryCondition: leadRetryCondition,
    });

    return axiosApiInstance.request({
      method: 'patch',
      url: this.apiUrl,
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
        ...(Boolean(data?.utm?.lead_source) && {
          ci_source_id: data.utm.lead_source,
        }),
        locale: getLanguage(),
      },
    });
  }

  getLead() {
    return axiosApiInstance.request({
      method: 'get',
      url: this.apiUrl,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}

export default LeadsApi;
