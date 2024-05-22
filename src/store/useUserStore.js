import { defineStore } from "pinia";
import { getMe } from "../api/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    info: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    setUser(user) {
      this.info = user;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearUser() {
      this.info = null;
      this.token = null;
      localStorage.removeItem('token');
    },
    async fetchUser() {
      if (this.token) {
        try {
          const user = await getMe();
          this.setUser(user);
        } catch (error) {
          this.clearUser();
        }
      }
    }
  }
});