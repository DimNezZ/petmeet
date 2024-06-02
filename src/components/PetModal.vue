<template>
  <div
    :class="{ petcard_visible: props.open }"
    class="petcard_background"
    @click.self="emit('close')"
  >
    <div class="petcard_container">
      <div class="column">
        <div class="petcard_photo">
          <img :src="pet.photo" alt="" />
          <CustomError :errors="formErrors.photo" />
          <CustomButton v-if="editing" variant="secondary">Добавить фото</CustomButton>
          <CustomButton v-if="editing" variant="destructive">Удалить фото</CustomButton>
        </div>
        <div class="petcard_inputs">
          <CustomInput
            name="name"
            label="Имя"
            :value="data.name"
            :readonly="!editing"
            @input="data.name = $event.target.value"
          />
          <CustomError :errors="formErrors.pet_name" />

          <CustomSelect
            v-if="editing"
            name="type"
            label="Тип животного"
            :value="data.typeId"
            :readonly="!editing"
            :options="petsStore.types"
            :render-option="renderTypeOption"
            @change="data.typeId = Number($event.target.value)"
          />
          <CustomInput
            v-else
            name="type"
            label="Тип животного"
            :value="pet.type"
            :readonly="!editing"
          />
          <CustomError :errors="formErrors.pet_type" />

          <CustomSelect
            v-if="editing"
            name="breed"
            label="Порода"
            :value="data.breedId"
            :readonly="!editing"
            :options="filteredBreeds"
            :render-option="renderBreedOption"
            @change="data.breedId = Number($event.target.value)"
          />
          <CustomInput v-else name="breed" label="Порода" :value="pet.breed" :readonly="!editing" />
          <CustomError :errors="formErrors.breed" />

          <CustomSelect
            v-if="editing"
            name="sex"
            label="Пол"
            :value="data.sex"
            :readonly="!editing"
            :options="[
              { id: 'MALE', value: 'Муж.' },
              { id: 'FEMALE', value: 'Жен.' },
            ]"
            :render-option="renderSexOption"
            @change="data.sex = $event.target.value"
          />
          <CustomInput
            v-if="editing"
            name="age"
            label="Дата рождения"
            :value="data.birthDate"
            type="date"
            @input="data.birthDate = $event.target.value"
          />
          <CustomInput
            v-else
            name="age"
            label="Дата рождения"
            :value="pet.birthDate"
            :readonly="!editing"
          /><CustomError :errors="formErrors.birth_date" />

          <CustomTextArea
            name="description"
            label="Описание"
            :value="data.description"
            :readonly="!editing"
            @input="data.description = $event.target.value"
          />
          <CustomError :errors="formErrors.pet_description" />
        </div>
      </div>
      <CustomButton v-if="props.editing" @click="onSubmitClick">Сохранить</CustomButton>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';
import CustomButton from './CustomButton.vue';
import CustomInput from './CustomInput.vue';
import CustomTextArea from './CustomTextArea.vue';
import CustomSelect from './CustomSelect.vue';
import CustomError from './CustomError.vue';
import { usePetsStore } from '@/store/usePetsStore';

const petsStore = usePetsStore();

const props = defineProps({
  open: Boolean,
  editing: Boolean,
  pet: {
    type: Object,
    default: () => ({}),
  },
  onEdit: {
    type: Function,
    default: undefined,
  },
});

const data = reactive({ ...props.pet });

const formErrors = reactive({
  pet_name: [],
  pet_description: [],
  is_male: [],
  birth_date: [],
  photo: [],
  pet_type: [],
  breed: [],
});

const filteredBreeds = computed(() =>
  petsStore.breeds.filter(item => item.pet_type === data.typeId)
);

watch(
  () => data.typeId,
  typeId => {
    data.type = petsStore.types.find(item => item.id === typeId)?.type_name;
  }
);

watch(
  () => data.breedId,
  breedId => {
    data.breed = petsStore.breeds.find(item => item.id === breedId)?.breed_name;
  }
);

const emit = defineEmits(['close']);

const renderTypeOption = option => option.type_name;

const renderBreedOption = option => option.breed_name;

const renderSexOption = option => option.value;

const onSubmitClick = async () => {
  try {
    await props.onEdit?.(data);
    emit('close');
  } catch (error) {
    const responseErrors = error.response.data;
    for (const key in formErrors) {
      if (responseErrors[key]) {
        formErrors[key] = responseErrors[key];
      } else {
        formErrors[key] = [];
      }
    }
  }
};
</script>

<style scoped>
.petcard_background {
  display: none;
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
.petcard_visible {
  display: flex;
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
