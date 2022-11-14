import actionStrings from "./actionStrings";

export const addPromoAction = (
  product,
  select_id,
  newPicture,
  newName,
  newDesc,
  newDiscount,
  newColor,
  newStart,
  newEnd,
  newCode,
  select
) => {
  return {
    type: actionStrings.addPromo,
    product: product,
    select_id: select_id,
    newPicture: newPicture,
    newName: newName,
    newDesc: newDesc,
    newDiscount: newDiscount,
    newColor: newColor,
    newStart: newStart,
    newEnd: newEnd,
    newCode: newCode,
    select: select,
  };
};
