import React, { useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const cartCtx = useContext(CartContext);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkoutHandler = ()=>{
    setIsCheckout(true)
  }

  const submitOrderHandler= async(userData)=>{
    setIsSubmitting(true)
    await fetch("https://react-http-9d71b-default-rtdb.firebaseio.com/orders.json",{
      method : "POST",
      body : JSON.stringify({
        data : userData,
        orderList : cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCxt()
  }

  const ModalActions =  <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
</div>

  const ModalContext = <React.Fragment>
         {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && ModalActions}
  </React.Fragment>


  const SubmittingContent = <p>Sendig data Order...</p>
  const DidSubmittingContent = <React.Fragment>
    <p>Successfully sent the data!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && ModalContext}
     {isSubmitting && SubmittingContent}
      {!isSubmitting && didSubmit && DidSubmittingContent}
    </Modal>
  );
};

export default Cart;
