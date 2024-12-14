import { updateUserData, addCreditCard } from '../../services/apiProfile';

const token = localStorage.getItem('token');
const nameRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9_ ]{3,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cardNumberRegex = /^[a-zA-Z0-9]{16,}$/;
const expiryDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export async function profileAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
 // console.log(data);

  if (data.actionType === 'addCreditCard') {
    const errors = {};

    if (!cardNumberRegex.test(data.cardNumber)) {
      errors.cardNumber = 'Please provide at least 16 digits.';
    }

    if (!nameRegex.test(data.cardholderName)) {
      errors.cardholderName = 'Please provide a valid name.';
    }
    if (!expiryDateRegex.test(data.expiryDate)) {
      errors.expiryDate = 'It should formatted like that 2024-10-11.';
    }

    if (Object.keys(errors).length > 0) return errors;

    const cardInfo = {
      cardNumber: data.cardNumber,
      cardholderName: data.cardholderName,
      expiryDate: data.expiryDate,
    };

    await addCreditCard(token, cardInfo);

    return {
      success: true,
    };
  } else if (data.actionType === 'updateUserData') {
    const errors = {};

    if (!nameRegex.test(data.username)) {
      errors.username = 'Please provide a valid name.';
    }

    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email.';
    }

    if (Object.keys(errors).length > 0) return errors;

    const userInfo = {
      username: data.username,
      email: data.email,
    };

    await updateUserData(token, userInfo);

    return {
      success: true,
    };
  }

  return null;
}
