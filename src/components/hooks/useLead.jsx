import useSWR, { mutate } from 'swr';

const useLead = (leadsService, shouldFetch = true) => {
  const { data, error, isValidating } = useSWR(
    shouldFetch ? 'lead' : null,
    () => leadsService.getLead(),
    {
      onError: (err, key) => {
        console.log(key, err);
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    lead: data,
    isLoading: shouldFetch ? (!error && !data) || isValidating : false,
    isError: error,
    mutate: () => mutate('lead'),
  };
};

export default useLead;
