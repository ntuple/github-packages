export const generateUtmData = (leadSource) => {
  let data = {};
  // Get UTM data from localstorage
  const localstorageUTM = localStorage.getItem('utm');
  if (localstorageUTM) {
    data = JSON.parse(localstorageUTM);
    // remove created_date as we are not using it right now
    delete data.created_date;
  }

  return {
    ...(Boolean(leadSource) && { lead_source: leadSource }),
    ...data,
  };
};
