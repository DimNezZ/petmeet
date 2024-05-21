import { api } from "./core.js";

export const getPets = () => {
  return api.get("/petprofiles/").then((response) => response.data);
};
export const getBreeds = () => {
  return api.get("/breeds/").then((response) => response.data);
};
export const getTypes = () => {
  return api.get("/pet-types/").then((response) => response.data);
};
