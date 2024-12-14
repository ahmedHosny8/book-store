import {
  getUserData,
  getUserCreditCards,
  getUserReviews,
} from '../../services/apiProfile';

const token = localStorage.getItem('token');

export async function profileLoader() {
  const [userData, creditCards, userReviews] = await Promise.all([
    getUserData(token),
    getUserCreditCards(token),
    getUserReviews(token),
  ]);

  return {
    userData,
    creditCards,
    userReviews,
  };
}

