import { api } from './core.js';

export const lookUpCard = id => {
  return api
    .post('/lookup_cards/', {
      current_card_id: id,
    })
    .then(response => response.data);
};

export const likePet = (likedPet, likerPet) => {
  return api
    .post('/likes/', {
      pet_liker: likerPet,
      pet_liked: likedPet,
    })
    .then(response => response.data);
};
