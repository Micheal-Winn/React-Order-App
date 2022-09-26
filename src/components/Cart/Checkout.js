import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

  const isEmpty = value => value.trim() === '';
  const isFiveChars = value=> value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formIsValidity,setFormIsValidity] = useState({
    name : true,
    street : true,
    postcode : true,
    city : true
  })

  const confirmHandler = (event) => {
    event.preventDefault();


    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostCode = postCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostCodeIsValid = isFiveChars(enteredPostCode)
    const enteredCityIsValid = !isEmpty(enteredCity)


    setFormIsValidity({
      name :enteredNameIsValid,
      street : enteredStreetIsValid,
      postcode : enteredPostCodeIsValid,
      city : enteredCityIsValid
    })


    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostCodeIsValid && enteredCityIsValid;

    if(!formIsValid){
      return;
    }
     
    props.onConfirm({
      name : enteredName,
      street : enteredStreet,
      postcode :enteredPostCode,
      city : enteredCity
    })

  };


  const nameControlClasses = `${classes.control} ${
    formIsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formIsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formIsValidity.postcode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formIsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formIsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formIsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postCodeInputRef} />
        {!formIsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formIsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;