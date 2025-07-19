// src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import { loadCartFromLocalStorage, getCartItems, calculateTotal, removeFromCart, addToCart } from '../cartLogic';
import './css/Cart.css';
import { Helmet } from 'react-helmet';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    phoneNumber: '',
    address: '',
  });
  const [comments, setComments] = useState({});

  useEffect(() => {
    loadCartFromLocalStorage();
    const items = getCartItems();
    setCartItems(items);
    setTotal(calculateTotal());
  }, []);

  const handleRemove = (id) => {
    const updatedCart = removeFromCart(id);
    setCartItems(updatedCart);
    setTotal(calculateTotal());
  };

  const handleIncrease = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        item.amount++;
      }
      return item;
    });
    setCartItems(updatedItems);
    setTotal(calculateTotal());
  };

  const handleDecrease = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.amount > 1) {
        item.amount--;
      }
      return item;
    });
    setCartItems(updatedItems);
    setTotal(calculateTotal());
  };

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCommentsChange = (id, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [id]: value,
    }));
  };

  const handleFinalizePurchase = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    const orderDetails = `
      Orden hecha desde la web!!,
      Número de Teléfono: ${checkoutData.phoneNumber}
      Dirección: ${checkoutData.address}
      Productos: ${cartItems.map(item => `
        ${item.name || item.title} 
        (Cantidad: ${item.amount}, Precio: Q.${item.price}.⁰⁰) 
        Comentarios: ${comments[item.id] || 'Ninguno'}
      `).join(', ')},
      Total: Q.${total}.⁰⁰
    `;

    const whatsappMessage = encodeURIComponent(orderDetails);
    const whatsappLink = `https://wa.me/35330000?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <section id="cart" className="cart-section">
      <Helmet>
        <title>Carrito de Compras - La Casa del Adobo</title>
        <meta name="description" content="Revisa y finaliza tu compra en La Casa del Adobo. Deliciosos platillos y combos." />
      </Helmet>
      <h5 className="cart-title">Carrito de Compras</h5>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name || item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name || item.title}</span>
                  <span className="cart-item-price">Precio: Q.{item.price}.⁰⁰</span>
                  <span className="cart-item-quantity">Cantidad: {item.amount}</span>
                  <textarea
                    placeholder="Comentarios adicionales"
                    className="comments-input"
                    value={comments[item.id] || ''}
                    onChange={(e) => handleCommentsChange(item.id, e.target.value)}
                  />
                  <div className="cart-item-actions">
                    <button className="cart-action-button" onClick={() => handleIncrease(item.id)}>+</button>
                    <button className="cart-action-button" onClick={() => handleDecrease(item.id)}>-</button>
                    <button className="ui-btn" onClick={() => handleRemove(item.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h6 className="total-price">Total: Q.{total}.⁰⁰</h6>
          <button className="checkout-button" onClick={handleFinalizePurchase}>Finalizar Compra</button>
        </div>
      )}

      {showCheckout && (
        <div className="checkout-form">
          <h5 className="checkout-title">Datos de Envío</h5>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Número de Teléfono"
            className="checkout-input"
            value={checkoutData.phoneNumber}
            onChange={handleCheckoutChange}
            required
          />
          <textarea
            name="address"
            placeholder="Dirección Exacta"
            className="checkout-input"
            value={checkoutData.address}
            onChange={handleCheckoutChange}
            required
          />

          <div className="invoice">
            <h6 className="invoice-title">Factura</h6>
            <div className="invoice-details">
              <p><strong>Teléfono:</strong> {checkoutData.phoneNumber}</p>
              <p><strong>Dirección:</strong> {checkoutData.address}</p>
            </div>
            <h6 className="order-summary-title">Detalles del Pedido</h6>
            <ul className="order-summary-list">
              {cartItems.map(item => (
                <li key={item.id} className="order-summary-item">
                  {item.name || item.title} - Cantidad: {item.amount} - Precio: Q.{item.price}.⁰⁰
                </li>
              ))}
            </ul>
            <h6 className="total-price">Total: Q.{total}.⁰⁰</h6>
          </div>
          <button className="place-order-button" onClick={handlePlaceOrder}>Pedir</button>
        </div>
      )}
    </section>
  );
}

export default Cart;
