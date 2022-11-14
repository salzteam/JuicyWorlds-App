import actionStrings from "../actions/actionStrings";
// buat reducers
// (prevState, action) => {}

const initialState = {
  size: null,
  qty: null,
  name: null,
  image: null,
  price: null,
  size_id: null,
  subTotal: null,
  delivery_id: null,
  subTotal: null,
  shippihg: null,
  sizeCost: null,
  tax: null,
  product_id: null,
};

const cartReducer = (prevState = initialState, action) => {
  // lakukan pengondisian untuk masing masing action
  switch (action.type) {
    case actionStrings.addCart:
      //   const newCounter = prevState.number + 1;
      const size = action.size;
      const qty = action.qty;
      const name = action.name;
      const image = action.image;
      const price = action.price;
      const size_id = action.size_id;
      const subTotal = action.subTotal;
      const delivery = action.delivery;
      const delivery_id = action.delivery_id;
      const sizeCost = action.sizeCost;
      const id = action.id;
      return {
        size: size,
        qty: qty,
        name: name,
        image: image,
        price: price,
        size_id: size_id,
        subTotal: subTotal,
        shippihg: delivery,
        sizeCost: sizeCost,
        tax: 0,
        delivery_id: delivery_id,
        product_id: id,
      };
    default:
      return prevState;
  }
};

export default cartReducer;
