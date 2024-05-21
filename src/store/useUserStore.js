import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return { info: null };
  },
  actions: {
    setUser(user) {
      this.info = user;
    },
  },
});
