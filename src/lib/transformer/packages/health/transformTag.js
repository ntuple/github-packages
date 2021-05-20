export default (tags) => {
  const i18nPrefix = 'health:tags';
  const i18nPrefixToolTips = 'health:tags.tool_tips';
  const i18nTags = [];

  tags.forEach((tag) =>
    i18nTags.push({
      tag: `${i18nPrefix}.${tag}`,
      toolTip: `${i18nPrefixToolTips}.${tag}`,
    })
  );

  return i18nTags;
};
