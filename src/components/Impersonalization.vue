<template>
  <div class="impersonalization">
    <Container class="impersonalization_inner">
      <div v-if="currentPet" class="pet_info">
        <img :src="currentPet?.photo" alt="" class="pet_image" />
        <p class="pet_name">{{ currentPet?.name }}</p>
      </div>
      <RouterLink to="/" class="impersonalization_link">Выбрать другого питомца</RouterLink>
    </Container>
  </div>
</template>

<script setup>
import { usePetsStore } from '@/store/usePetsStore';
import { computed } from 'vue';
import Container from './Container.vue';

const props = defineProps({
  petId: {
    type: Number,
  },
});

const petsStore = usePetsStore();

const currentPet = computed(() => {
  return petsStore.pets.find(pet => pet.id === props.petId);
});
</script>

<style scoped>
.impersonalization {
  background-color: #77a42c;
  color: #fff;
}
.impersonalization_inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 10px;
  height: 48px;
}
.impersonalization_link {
  color: inherit;
  text-decoration: none;
}
.pet_info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pet_image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 10px;
}
.pet_name {
  margin: 0;
  font-size: 1.25em;
  font-weight: 600;
}
</style>
