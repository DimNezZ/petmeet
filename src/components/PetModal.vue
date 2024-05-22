<template>
  <div v-if="open" @click.self="emit('close')" class="petcard_background">
    <div class="petcard_container">
      <div class="column">
        <div class="petcard_photo">
          <img :src="localPet.image || '/profile-default.svg'" alt="Pet photo" />
          <CustomButton variant="secondary">Добавить фото</CustomButton>
          <CustomButton variant="destructive">Удалить фото</CustomButton>
        </div>
        <div class="petcard_inputs">
          <CustomInput v-model="localPet.name" name="name" label="Имя" />
          <CustomSelect v-model="localPet.type" name="type" label="Тип животного" :options="petTypeOptions" />
          <CustomSelect v-model="localPet.breed" name="breed" label="Порода" :options="breedOptions" />
          <CustomSelect v-model="localPet.sex" name="sex" :options="sexOptions" />
          <CustomInput v-model="localPet.birthDate" name="birthDate" type="date" label="Дата рождения" />
          <CustomTextArea v-model="localPet.status" name="text" label="Описание" />
        </div>
      </div>
      <CustomButton v-if="editing" @click="savePet">Сохранить</CustomButton>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue';
import CustomButton from "./CustomButton.vue";
import CustomInput from "./CustomInput.vue";
import CustomTextArea from "./CustomTextArea.vue";
import CustomSelect from "./CustomSelect.vue";

const props = defineProps({
  open: Boolean,
  editing: Boolean,
  pet: Object,
  petTypes: Array,
  breeds: Array
});

const emit = defineEmits(["close", "save"]);

const localPet = reactive({ ...props.pet });

watch(() => props.open, (newOpen) => {
  if (newOpen) {
    Object.assign(localPet, props.pet); // Сбрасываем данные при открытии модального окна
  }
});

const savePet = () => {
  emit('save', { ...localPet });
};

const petTypeOptions = computed(() => {
  return props.petTypes ? props.petTypes.map(type => ({ value: type.id, text: type.type_name })) : [];
});

const breedOptions = computed(() => {
  return props.breeds ? props.breeds.map(breed => ({ value: breed.id, text: breed.breed_name })) : [];
});

const sexOptions = [
  { value: true, text: 'Мужской' },
  { value: false, text: 'Женский' }
];
</script>

<style scoped>
.petcard_background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.petcard_container {
  background-color: #f3f5f6;
  padding: 30px;
  width: 800px;
  border-radius: 10px;
}
.column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.petcard_photo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.petcard_photo > img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 40px;
}
.petcard_inputs {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
}
.petcard_text {
  min-height: 140px;
}
</style>
