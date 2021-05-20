import MotorTransformer from './motor/transformer';
import HealthTransformer from './health/transformer';

export default (type) => {
  switch (type) {
    case 'motor':
      return new MotorTransformer();
    case 'health':
      return new HealthTransformer();
  }

  return null;
};
