const handleUserScore = ({
  leadsService,
  payload,
  score,
  activity,
  activityList,
}) => {
  const validActivities = [
    'package_detail',
    'package_comparision',
    'package_filter',
    'checkout_package',
  ];

  const calculateLeadScore = (newActivityList) => {
    if (newActivityList.includes('checkout_package')) {
      return 1;
    }
    if (newActivityList.length >= 2) {
      return 2;
    }
    if (newActivityList.length === 1) {
      return 3;
    }
    return 4;
  };

  if (
    validActivities.includes(activity) &&
    !activityList.includes(activity) &&
    !activityList.includes('checkout_package')
  ) {
    activityList.push(activity);
    const newScore = calculateLeadScore(activityList);
    const data = {
      ...payload,
      lead_score: newScore,
    };

    if (score !== newScore) {
      leadsService.updateLead(data);
    }

    return {
      score: newScore,
      activityList,
    };
  }

  return {
    score,
    activityList,
  };
};

export default handleUserScore;
