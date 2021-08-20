import { useRef, useState } from "react";
import Classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    Name: true,
    Street: true,
    HouseNumber: true,
    PostalCode: true,
    City: true,
    Phone: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const houseNumberInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const phoneInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredHouseNumber = houseNumberInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredHouseNumberIsValid = !isEmpty(enteredHouseNumber);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPhoneIsValid = !isEmpty(enteredPhone);

    setFormInputsValidity({
      Name: enteredNameIsValid,
      Street: enteredStreetIsValid,
      HouseNumber: enteredHouseNumberIsValid,
      PostalCode: enteredPostalCodeIsValid,
      City: enteredCityIsValid,
      Phone: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreet &&
      enteredHouseNumber &&
      enteredPostalCode &&
      enteredCity &&
      enteredPhone;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      Name: enteredName,
      Street: enteredStreet,
      HouseNumber: enteredHouseNumber,
      PostalCode: enteredPostalCode,
      City: enteredCity,
      Phone: enteredPhone,
    });
  };

  return (
    <form className={Classes.form} onSubmit={confirmHandler}>
      <div className={Classes.control}>
        <label htmlFor="name">Your Name: </label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.Name && <p>Please enter a valid name!</p>}
      </div>
      <div className={Classes.control}>
        <label htmlFor="Street">Street Name: </label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.Street && <p>Please enter a valid street name!</p>}
      </div>
      <div className={Classes.control}>
        <label htmlFor="HousrNr">House Number: </label>
        <input type="text" id="houseNb" ref={houseNumberInputRef} />
        {!formInputsValidity.HouseNumber && (
          <p>Please enter a valid house number!</p>
        )}
      </div>
      <div className={Classes.control}>
        <label htmlFor="PostalCode">Postal Code: </label>
        <input type="text" id="postalCode" ref={postalCodeInputRef} />
        {!formInputsValidity.PostalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={Classes.control}>
        <label htmlFor="City">City: </label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.City && <p>Please enter a valid city!</p>}
      </div>

      <div className={Classes.control}>
        <label htmlFor="Phone">Phone Number: </label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.Phone && <p>Please enter a valid phone number!</p>}
      </div>
      <div className={Classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
