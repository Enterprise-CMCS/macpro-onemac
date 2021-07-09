import * as cardButtonTypes from "./cardButtonTypeData.json";

const getCardButtonPropsByType = (type) => {
  const result = cardButtonTypes.default[type];
  if (!result) {
    throw new Error("Invalid CardButton type value.");
  }
  return result;
};

export default getCardButtonPropsByType;
