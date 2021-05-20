import { normalizeAnswers } from '../questions';

class LeadsService {
  constructor(api) {
    this.api = api;
  }

  saveLead(questions, answers, utm = null) {
    const values = {
      ...normalizeAnswers(answers, questions),
      ...(Boolean(utm) && {
        utm,
      }),
    };

    return this.api
      .saveLead(values)
      .then((response) => {
        const { data, headers, status } = response;

        const leadStatus = {
          complete: false,
          status: 'updated',
        };

        if (status === 201) {
          leadStatus.status = 'created';
          leadStatus.leadId = data.lead_id;
        }

        if (data.quote_page_url) {
          leadStatus.complete = true;
          leadStatus.redirect_to = data.quote_page_url;
        }

        if (headers['x-rf-lead-status']) {
          leadStatus.complete = headers['x-rf-lead-status'] === 'complete';
        }

        if (headers['X-RF-Redirect-Override']) {
          leadStatus.redirect_to = headers['X-RF-Redirect-Override'];
        }

        return leadStatus;
      })
      .catch((error) => {
        if (error.response.status !== 422) {
          throw error;
        }

        return {
          complete: false,
          status: 'not_processed',
        };
      });
  }

  // Update a lead (how is this different from save?)
  updateLead(values) {
    return this.api.saveLead(values);
  }

  // Get a lead
  getLead() {
    return this.api.getLead().then((response) => {
      return response.data;
    });
  }
}

export default LeadsService;
