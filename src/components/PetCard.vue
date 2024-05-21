<template>
  <div class="petcard_wrapper">
    <div class="petcard_image_container">
      <img :src="photo" alt="" class="petcard_image" />
    </div>
    <div class="petcard_info">
      <div class="petcard_characteristics_column title">
        <div class="petcard_characteristics">{{ name }}</div>
        <div class="petcard_characteristics">
          <img v-if="sex" :src="male" alt="" class="maincard_pet_sex" />
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
        <CustomButton @click="data.visibleView = true">Открыть</CustomButton>
        <CustomButton @click="data.visibleEditing = true" variant="secondary"
          >Редактировать</CustomButton
        >
      </div>
    </div>
  </div>
  <PetModal :open="data.visibleView" @close="data.visibleView = false" />
  <PetModal
    :editing="true"
    :open="data.visibleEditing"
    @close="data.visibleEditing = false"
  />
</template>

<script setup>
import { reactive, computed } from "vue";
import CustomButton from "./CustomButton.vue";
import PetModal from "./PetModal.vue";

import male from "../assets/male.png";
import female from "../assets/female.png";

const data = reactive({ visibleView: false, visibleEditing: false });

const props = defineProps({
  id: Number,
  photo: String,
  name: String,
  age: String,
  type: String,
  breed: String,
  sex: Boolean,
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
