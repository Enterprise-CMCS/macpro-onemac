export const getCurrentStatus = (attr) => {
  if (!attr || attr.length === 0) return null;

  const latestAttribute = attr.reduce((latestItem, currentItem) =>
    currentItem.date > latestItem.date ? currentItem : latestItem
  );
  return latestAttribute;
};

const isLatestAttributeActive = (attr) => {
  return getCurrentStatus(attr)?.status === "active";
};

export const getAuthorizedStateList = (user) => {
  const tempStateList = [];

  if (
    !user?.attributes ||
    (!user?.attributes?.history && isLatestAttributeActive(user.attributes))
  )
    return "All";

  user.attributes.forEach((attribute) => {
    isLatestAttributeActive(attribute.history)
      ? tempStateList.push(attribute?.stateCode)
      : null;
  });

  return tempStateList;
};
