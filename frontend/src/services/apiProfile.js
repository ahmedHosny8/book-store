import axios from 'axios';
import toast from 'react-hot-toast';

export async function getUserData(token) {
  try {
    const res = await axios.get(
      'https://book-store-backend-sigma-one.vercel.app/users/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log('There is an error loading data...', error);
  }
}

export async function updateUserData(token, data) {
  try {
    const res = await axios.patch(
      'https://book-store-backend-sigma-one.vercel.app/users/profile',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    toast.success('Updated successfully');
  } catch (error) {
    console.log('There is an error Updating data...', error);
    toast.error('Something went wrong');
  }
}

export async function getUserCreditCards(token) {
  try {
    const res = await axios.get(
      'https://book-store-backend-sigma-one.vercel.app/card/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log('There is an error loading data...', error);
  }
}

// ////////////////////////////Deletcard //////////////////////////
export async function deleteCard(token, cardId) {
  // console.log( cardId);
  try {
    const res = await axios.delete(
      
      `https://book-store-backend-sigma-one.vercel.app/card/${cardId}`,
      {
        headers: {
          Authorization: `Bearer `+  token,
        },
        
      }
      
    );
    return res.data;
  } catch (error) {

    console.log( error);

  }
}



export async function addCreditCard(token, data) {
  try {
    const res = await axios.post(
      'https://book-store-backend-sigma-one.vercel.app/card',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success('Credit Card added successfully');
    return res.data;
  } catch (error) {
    console.log('There is an error Adding data...', error);
    toast.error('Something went wrong');
  }
}

export async function getUserReviews(token) {
  try {
    const res = await axios.get(
      'https://book-store-backend-sigma-one.vercel.app/review/user/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log('There is an error loading data...', error);
  }
}
