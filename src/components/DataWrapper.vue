<template>
  <slot></slot>
</template>

<script setup>
import { getBreeds, getTypes } from '../api/pets';
import { getMe } from '../api/user';
import { usePetsStore } from '../store/usePetsStore';
import { useUserStore } from '../store/useUserStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
const petsStore = usePetsStore();

onMounted(() => {
  getMe().then(user => {
    userStore.setUser(user);
  });
  getBreeds().then(breeds => {
    petsStore.setBreeds(breeds);
  });
  getTypes().then(types => {
    petsStore.setTypes(types);
  });
});
</script>
