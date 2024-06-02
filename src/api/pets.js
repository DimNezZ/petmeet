import { api } from './core.js';

export const getPets = () => {
  return api.get('/petprofiles/').then(response => response.data);
};

export const getBreeds = () => {
  return api.get('/breeds/').then(response => response.data);
};

export const getTypes = () => {
  return api.get('/pet-types/').then(response => response.data);
};

/**
 * @typedef {Object} PetSavePayload
 * @property {string} pet_name
 * @property {string} pet_description
 * @property {boolean} is_male
 * @property {string} birth_date
 * @property {string} photo
 * @property {number} pet_type
 * @property {number} breed
 */

/**
 * @param {number} id
 * @param {PetSavePayload} data
 */
export const savePet = (id, data) => {
  return api.patch(`/petprofiles/${id}/`, data).then(response => response.data);
};
export const addPet = data => {
  return api.post(`/petprofiles/`, data).then(response => response.data);
};
