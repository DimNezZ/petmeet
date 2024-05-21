import { api } from "./core.js";

export const getPets = () => {
  return api.get("/petprofiles/").then((response) => response.data);
};
