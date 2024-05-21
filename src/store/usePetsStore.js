import dayjs from "../adapters/day";
import { defineStore } from "pinia";

export const usePetsStore = defineStore("pets", {
  state: () => {
    return { data: [], breeds: [], types: [] };
  },
  getters: {
    pets: (state) => {
      return state.data.map((pet) => {
        return {
          id: pet.id,
          name: pet.pet_name,
          description: pet.pet_description,
          sex: pet.is_male,
          age: dayjs().from(dayjs(pet.birth_date), true),
          photo: pet.photo,
          type: state.types.find((item) => item.id === pet.pet_type)?.type_name,
          breed: state.breeds.find((item) => item.id === pet.breed)?.breed_name,
        };
      });
    },
  },
  actions: {
    setPets(pets) {
      this.data = pets;
    },
    setBreeds(breeds) {
      this.breeds = breeds;
    },
    setTypes(types) {
      this.types = types;
    },
  },
});
