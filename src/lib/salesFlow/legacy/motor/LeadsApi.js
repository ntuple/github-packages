import axiosApiInstance from 'lib/services/interceptor';
import LeadsApi from '../leadsApi';

class MotorLeadApi extends LeadsApi {
  constructor(apiUrl) {
    super(apiUrl);
  }

  updateNamedDriverDob(age) {
    return axiosApiInstance.patch(`${this.apiUrl}/driver-dob`, {
      age,
    });
  }
}

export default MotorLeadApi;
