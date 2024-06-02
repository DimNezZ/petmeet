import { api } from './core.js';

export const lookUpCard = id => {
  return api
    .post('/lookup_cards/', {
      current_card_id: id,
    })
    .then(response => response.data);
};
