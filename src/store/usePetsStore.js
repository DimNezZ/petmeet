import { defineStore } from "pinia";

export const usePetsStore = defineStore("pets", {
  state: () => {
    return { data: [] };
  },
  actions: {
    setPets(pets) {
      this.data = pets;
    },
  },
});
