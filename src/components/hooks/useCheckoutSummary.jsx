import useSWR from 'swr';
import { useMemo } from 'react';
import CheckoutService from '../../lib/services/checkoutService';
import factory from '../../lib/transformer/checkout/factory';

const useCheckoutSummary = (packageType, apiFactory) => {
  // API Services
  const checkoutService = useMemo(() => {
    return new CheckoutService(apiFactory.getCheckoutApi());
  }, [apiFactory]);

  const { data, error } = useSWR(
    'checkoutSummary',
    () => checkoutService.getSummary(),
    {
      onError: (err, key) => {
        console.log(key, err);
      },
    }
  );
  const transformer = factory(packageType);

  return {
    summary: data ? transformer.transformApiSummary(data) : data,
    isLoading: !error && !data,
    isError: error || (data && data.has_order),
  };
};

export default useCheckoutSummary;
