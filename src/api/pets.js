import { api } from "./core.js";

export const getPets = () => {
  return api.get("/petprofiles/").then((response) => response.data);
};

export const getPetProfile = (id) => {
  return api.get(`/petprofiles/${id}/`).then((response) => response.data);
};

export const getPetTypes = () => {
  return api.get("/pet-types/").then((response) => response.data);
};

export const getBreeds = () => {
  return api.get("/breeds/").then((response) => response.data);
};

export const updatePetProfile = (id, data) => {
  return api.patch(`/petprofiles/${id}/`, data).then((response) => response.data);
};

export const createPetProfile = (data) => {
  return api.post("/petprofiles/", data).then((response) => response.data);
};

export const lookupCard = (currentCardId) => {
  return api.post("/lookup_cards/", { current_card_id: currentCardId }).then((response) => response.data);
};

export const likePet = (petLikerId, petLikedId) => {
  return api.post("/likes/", {
    pet_liker: petLikerId,
    pet_liked: petLikedId
  }).then((response) => response.data);
};
