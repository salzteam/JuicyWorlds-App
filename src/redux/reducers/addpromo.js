import actionStrings from "../actions/actionStrings";
// buat reducers
// (prevState, action) => {}

const initialState = {
  product: "Select Product...",
  select_id: null,
  newPicture: null,
  newName: null,
  newDesc: null,
  newDiscount: null,
  newColor: null,
  newStart: null,
  newEnd: null,
  newCode: null,
  select: false,
};

const addPromoReducer = (prevState = initialState, action) => {
  // lakukan pengondisian untuk masing masing action
  switch (action.type) {
    case actionStrings.addPromo:
      //   const newCounter = prevState.number + 1;
      const product = action.product;
      const select_id = action.select_id;
      const newPicture = action.newPicture;
      const newName = action.newName;
      const newDesc = action.newDesc;
      const newDiscount = action.newDiscount;
      const newColor = action.newColor;
      const newStart = action.newStart;
      const newEnd = action.newEnd;
      const newCode = action.newCode;
      const select = action.select;
      return {
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
    default:
      return prevState;
  }
};

export default addPromoReducer;
