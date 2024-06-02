import { mapperPet } from '@/utils/pet';
import { defineStore } from 'pinia';

export const usePetsStore = defineStore('pets', {
  state: () => {
    return {
      data: [],
      breeds: [],
      types: [],
    };
  },
  getters: {
    pets: state => {
      return state.data.map(pet => {
        return mapperPet(pet, state.types, state.breeds);
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
    addPet(pet) {
      this.data.push(pet);
    },
    updatePet(pet) {
      this.data = this.data.map(item => {
        if (item.id === pet.id) {
          return pet;
        }

        return item;
      });
    },
    computePet(pet) {
      return mapperPet(pet, this.types, this.breeds);
    },
  },
});
