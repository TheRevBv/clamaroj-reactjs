export const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.precio * item.cantidad;
  }, 0);
};
