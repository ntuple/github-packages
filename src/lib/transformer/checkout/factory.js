import MotorTransformer from './motor/orderSummaryTransformer';
import HealthTransformer from './health/orderSummaryTransformer';

export default (type) => {
  switch (type) {
    case 'motor':
      return new MotorTransformer();
    case 'health':
      return new HealthTransformer();
  }

  return null;
};
