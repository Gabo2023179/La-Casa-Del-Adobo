let cart = [];

export const addToCart = (item) => {
  const existingItem = cart.find(product => product.id === item.id);
  
  if (existingItem) {
    existingItem.amount++;
  } else {
    item.amount = 1;
    item.basePrice = parseFloat(item.price); // Asegúrate de que el precio base es un número
    item.price = item.basePrice; // Inicializar el precio actual
    cart.push(item);
  }
  
  updateLocalStorage();
  return cart;
};

export const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateLocalStorage();
  return cart;
};

export const getCartItems = () => {
  return cart;
};

export const calculateTotal = () => {
  return cart.reduce((total, item) => {
    const itemPrice = item.basePrice + (item.cheeseExtra ? 5 : 0); // Considerar queso extra
    return total + (itemPrice * item.amount);
  }, 0).toFixed(2);
};

const updateLocalStorage = () => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
  const storedCart = JSON.parse(localStorage.getItem('cartItems'));
  if (storedCart) {
    cart = storedCart;
  }
};
