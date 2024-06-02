<template>
  <div class="maincard">
    <Impersonalization :pet-id="currentId"></Impersonalization>
    <div v-if="pet" class="maincard_wrapper">
      <div class="maincard_image_container">
        <img :src="pet?.photo" alt="" class="maincard_image" />
      </div>
      <div class="maincard_description">
        <div class="maincard_pet_characteristics">
          <div class="maincard_pet_name">{{ pet?.name }}</div>
          <div class="maincard_pet_age">{{ pet?.age }}</div>
        </div>
        <div class="maincard_pet_characteristics">
          <div class="maincard_pet_breed">{{ pet?.breed }}</div>
          <img v-if="pet?.sex === 'MALE'" :src="male" alt="" class="maincard_pet_sex" />
          <img v-else :src="female" alt="" class="maincard_pet_sex" />
        </div>
      </div>
      <div class="maincard_button_container">
        <div class="maincard_button" @click="onLikeClick">
          <img src="../../assets/like_button.svg" alt="" />
        </div>
        <div class="maincard_button" @click="onDislikeClick">
          <img src="../../assets/disslike_button.svg" alt="" />
        </div>
      </div>
    </div>
    <div v-if="empty" class="maincard_wrapper">
      <span v-if="Number.isFinite(petId)" class="maincard_hint"
        >Для этого питомца закончились карточки</span
      >
      <span v-else class="maincard_hint">Выберите питомца</span>
    </div>
  </div>
</template>

<script setup>
import Impersonalization from '../Impersonalization.vue';
import male from '../../assets/male.png';
import female from '../../assets/female.png';
import { ref, watch } from 'vue';
import { likePet, lookUpCard } from '@/api/pet';
import { useRoute } from 'vue-router';
import { usePetsStore } from '@/store/usePetsStore';

const route = useRoute();
const petsStore = usePetsStore();
const petId = Array.isArray(route.query.pet)
  ? parseInt(route.query.pet[0])
  : parseInt(route.query.pet);

const currentId = ref(petId);
const pet = ref();
const empty = ref(false);

const loadNextPet = currentId => {
  lookUpCard(currentId.value)
    .then(data => {
      pet.value = petsStore.computePet(data);
    })
    .catch(() => {
      pet.value = undefined;
      empty.value = true;
    });
};

const onLikeClick = async () => {
  await likePet(pet.value.id, currentId.value);
  await loadNextPet(currentId);
};

const onDislikeClick = async () => {
  await loadNextPet(currentId);
};

watch(
  () => currentId,
  currentId => {
    loadNextPet(currentId);
  },
  { immediate: true }
);
</script>

<style scoped>
.maincard {
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100%;
}
.maincard_wrapper {
  margin: 0 auto;
  padding: 70px 0 100px 0;
  width: 550px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
}
.maincard_image_container {
  width: 550px;
  height: 550px;
}
.maincard_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.maincard_description {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 30px 50px 30px;
  border-radius: 0 0 10px 10px;

  background: rgba(255, 255, 255, 0.26);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  box-sizing: border-box;
}
.maincard_pet_characteristics {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  font-size: 20px;
}
.maincard_pet_sex {
  width: 30px;
  height: 30px;
}
.maincard_pet_name,
.maincard_pet_age {
  font-size: 32px;
}
.maincard_pet_name {
  font-weight: 700;
}
.maincard_button_container {
  display: flex;
  gap: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 295px);
}
.maincard_button {
  display: flex;
  border-radius: 50%;
  cursor: pointer;
}
.maincard_hint {
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: 800px;
  justify-content: center;
}
</style>
