import useSWR, { mutate } from 'swr';

const usePackages = (packagesService) => {
  const { data, error, isValidating } = useSWR(
    'packages',
    () => packagesService.getPackages(),
    {
      onError: (err, key) => {
        console.log(key, err);
      },
      revalidateOnFocus: false,
    }
  );

  return {
    apiPackages: data,
    isLoading: (!error && !data) || isValidating,
    isError: error,
    mutate: () => mutate('packages'),
  };
};

export default usePackages;
