<template>
  <Container>
    <div class="pets_title">
      <div class="pets_caption">Питомцы</div>
      <img src="../../assets/paw.svg" alt="" class="pets_icon" />
    </div>
    <div class="pets_wrapper">
      <PetCard v-for="pet in petsStore.pets" v-bind="pet" :key="pet.id" />
      <div class="pets_add" @click="modalsState.visibleEditing = true">
        <img src="../../assets/plus.svg" alt="" class="add_icon" />
      </div>
    </div>
  </Container>
  <PetModal
    :editing="true"
    :open="modalsState.visibleEditing"
    :on-edit="onAdd"
    @close="modalsState.visibleEditing = false"
  />
</template>

<script setup>
import Container from '../Container.vue';
import PetCard from '../PetCard.vue';
import PetModal from '../PetModal.vue';

import { usePetsStore } from '../../store/usePetsStore';
import { useUserStore } from '@/store/useUserStore';
import { addPet } from '../../api/pets.js';
import { reactive } from 'vue';

const petsStore = usePetsStore();
const userStore = useUserStore();

const onAdd = data => {
  return addPet({
    pet_name: data.name,
    pet_description: data.description,
    is_male: data.sex === 'MALE',
    birth_date: data.birthDate,
    photo: undefined,
    pet_type: data.typeId,
    breed: data.breedId,
    user: userStore.info.pk,
  }).then(pet => {
    petsStore.addPet(pet);
  });
};

// eslint-disable-next-line no-unused-vars
const modalsState = reactive({
  visibleEditing: false,
});
</script>

<style scoped>
.pets_title {
  display: flex;
  gap: 20px;
  font-size: 36px;
}
.pets_icon {
  width: 50px;
  height: 50px;
}
.pets_wrapper {
  width: 100%;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
}
.pets_add {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  background-color: #77a42c;
  width: 150px;
  height: 150px;
  cursor: pointer;
  margin: 0 50px;
}
.add_icon {
  width: 90px;
  height: 90px;
}
</style>
