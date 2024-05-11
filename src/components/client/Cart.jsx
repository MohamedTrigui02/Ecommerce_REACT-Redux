import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from '../../features/cartSlice';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Cart = () => {
  const cart = useSelector((state) => state.storecart);
  const dispatch = useDispatch();

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  const handleDecreaseCart = useCallback((product) => {
    dispatch(decreaseCart(product));
  }, [dispatch]);

  const handleRemoveFromCart = useCallback((product) => {
    dispatch(removeFromCart(product));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="cart-container">
      <h2>Liste des produits choisis</h2>
      <div className="cart-items-container">
        <div className="cart-items-header">
          <span>Produit</span>
          <span>Prix</span>
          <span>Quantité</span>
          <span>Total</span>
        </div>
        <div className="cart-items">
          {cart.cartItems.map((cartItem) => (
            <div className="cart-item" key={cartItem._id}>
              <div className="cart-product">
                <img src={cartItem.imageart} alt={cartItem.designation} />
                <div>
                  <h3>{cartItem.designation}</h3>
                  <p>{cartItem.reference}</p>
                  <button style={{color:"red"}} onClick={() => handleRemoveFromCart(cartItem)} className="remove-button">
                    Retirer
                  </button>
                </div>
              </div>
              <div className="cart-product-price">{cartItem.prix} TND</div>
              <div className="cart-product-quantity">
                <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                <div className="count">{cartItem.cartQuantity}</div>
                <button onClick={() => handleAddToCart(cartItem)}>+</button>
              </div>
              <div className="cart-product-total-price">
                {(cartItem.prix * cartItem.cartQuantity).toFixed(3)} TND
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <Button variant="danger" onClick={handleClearCart}>
Vider le panier          </Button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Total</span>
              <span className="amount">{cart.cartTotalAmount.toFixed(3)} TND</span>
            </div>
            <p>Taxes et frais d'expédition calculés à la caisse</p>
            <Link to={`/pay/${cart.cartTotalAmount}`} className="validate-pay-link" style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '10px'
            }}>
              Valider et Payer
            </Link>

            <Link to="/" className="continue-shopping-link" style={{
              backgroundColor: '#ffffff',
              color: '#007bff',
              border: '1px solid #007bff',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              display: 'block'
            }}>
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
