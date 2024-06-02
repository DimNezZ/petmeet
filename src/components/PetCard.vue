<template>
  <div class="petcard_wrapper">
    <div class="petcard_image_container">
      <img :src="photo" alt="" class="petcard_image" />
    </div>
    <div class="petcard_info">
      <div class="petcard_characteristics_column title">
        <div class="petcard_characteristics">{{ name }}</div>
        <div class="petcard_characteristics">
          <img v-if="sex === 'MALE'" :src="male" alt="" class="maincard_pet_sex" />
          <img v-else :src="female" alt="" class="maincard_pet_sex" />
        </div>
      </div>
      <div class="petcard_characteristics_column">
        <div class="petcard_characteristics_row">
          <div class="petcard_characteristics">{{ type }},</div>
          <div class="petcard_characteristics">{{ breed }}</div>
        </div>
        <div class="petcard_characteristics">{{ age }}</div>
      </div>
      <div class="petcard_status">Статус</div>
      <div class="petcard_description">{{ description }}</div>
      <div class="button_container">
        <CustomButton @click="modalsState.visibleView = true">Открыть</CustomButton>
        <CustomButton variant="secondary" @click="modalsState.visibleEditing = true">
          Редактировать
        </CustomButton>
      </div>
    </div>
  </div>
  <PetModal :pet="props" :open="modalsState.visibleView" @close="modalsState.visibleView = false" />
  <PetModal
    :pet="props"
    :editing="true"
    :open="modalsState.visibleEditing"
    :on-edit="onEdit"
    @close="modalsState.visibleEditing = false"
  />
</template>

<script setup>
import { reactive } from 'vue';
import PetModal from './PetModal.vue';
import CustomButton from './CustomButton.vue';

const petsStore = usePetsStore();

const onEdit = data => {
  return savePet(data.id, {
    pet_name: data.name,
    pet_description: data.description,
    is_male: data.sex === 'MALE',
    birth_date: data.birthDate,
    photo: undefined,
    pet_type: data.typeId,
    breed: data.breedId,
  }).then(pet => {
    petsStore.updatePet(pet);
  });
};

import male from '../assets/male.png';
import female from '../assets/female.png';
import { usePetsStore } from '@/store/usePetsStore';
import { savePet } from '@/api/pets';

const modalsState = reactive({
  visibleView: false,
  visibleEditing: false,
});

const props = defineProps({
  id: Number,
  photo: String,
  name: String,
  age: String,
  type: String,
  typeId: Number,
  breed: String,
  breedId: Number,
  birthDate: String,
  sex: String,
  description: String,
});
</script>

<style scoped>
.petcard_wrapper {
  width: 360px;
  display: flex;
  flex-direction: column;
  flex: 0 1 360px;
}
.petcard_image_container {
  width: 360px;
  height: 230px;
}
.petcard_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.petcard_info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 10px;
  text-align: start;
  font-size: 16px;
  box-sizing: border-box;

  border-radius: 0 0 10px 10px;
  background: rgba(255, 255, 255, 0.26);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  box-sizing: border-box;
}
.petcard_characteristics_column {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.petcard_characteristics_row {
  display: flex;
  gap: 5px;
}
.petcard_characteristics {
}
.title {
  font-size: 32px;
  font-weight: 700;
}
.maincard_pet_sex {
  width: 30px;
  height: 30px;
}
.petcard_status {
  font-size: 24px;
}
.button_container {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}
</style>
