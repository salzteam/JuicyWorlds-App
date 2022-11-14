import actionStrings from "./actionStrings";

export const addCartActions = (
  size,
  qty,
  image,
  name,
  price,
  size_id,
  subTotal,
  delivery,
  sizeCost,
  delivery_id,
  id
) => {
  return {
    type: actionStrings.addCart,
    size: size,
    qty: qty,
    name: name,
    image: image,
    price: price,
    size_id: size_id,
    subTotal: subTotal,
    delivery: delivery,
    sizeCost: sizeCost,
    delivery_id: delivery_id,
    id: id,
  };
};
