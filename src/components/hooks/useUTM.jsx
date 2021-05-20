import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const useUTM = (config) => {
  const router = useRouter();
  const data = useRef();
  let source = null;

  if (config) {
    source = config.name;

    if (router.query[config.suffixParam]) {
      source = `${source} - ${router.query[config.suffixParam]}`;
    }
  }

  // localstorage can only be used on client side.
  useEffect(() => {
    const getUtmData = () => {
      // Get UTM data from localstorage
      const localstorageUTM = localStorage.getItem('utm');
      if (localstorageUTM) {
        data.current = JSON.parse(localstorageUTM);
        // remove created_date as we are not using it right now
        delete data.current.created_date;
      }
    };

    getUtmData();
  }, []);

  return {
    lead_source: source,
    ...data.current,
  };
};

export default useUTM;
