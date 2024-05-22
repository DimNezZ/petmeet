<template>
  <div class="petcard_wrapper">
    <div class="petcard_image_container">
      <img :src="pet.image ?? '/profile-default.svg'" alt="Pet image" class="petcard_image" />
    </div>
    <div class="petcard_info">
      <div class="petcard_characteristics_column title">
        <div class="petcard_characteristics">{{ pet.name }}</div>
        <div class="petcard_characteristics">
          <img :src="sexIcon" :alt="pet.sex ? 'Male' : 'Female'" class="maincard_pet_sex" />
        </div>
      </div>
      <div class="petcard_characteristics_column">
        <div class="petcard_characteristics_row">
          <div class="petcard_characteristics">{{ getPetType(pet.type) }},</div>
          <div class="petcard_characteristics">{{ getBreed(pet.breed) }}</div>
        </div>
        <div class="petcard_characteristics">{{ calculateAge(pet.birthDate) }}</div>
      </div>
      <div class="petcard_status">Статус</div>
      <div class="petcard_description">{{ pet.status }}</div>
      <div class="button_container">
        <CustomButton @click="openPetPage">Открыть</CustomButton>
        <CustomButton @click="openEditModal" variant="secondary">Редактировать</CustomButton>
      </div>
    </div>
  </div>
  <PetModal :open="data.visibleView" @close="closeModal" :pet="pet" :petTypes="petTypes" :breeds="breeds" />
  <PetModal
    :editing="true"
    :open="data.visibleEditing"
    @close="closeEditModal"
    :pet="pet"
    :petTypes="petTypes"
    :breeds="breeds"
    @save="savePet"
  />
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from 'vue-router';
import CustomButton from "./CustomButton.vue";
import PetModal from "./PetModal.vue";
import { updatePetProfile } from '../api/pets.js';
import maleIcon from "../assets/male.png";
import femaleIcon from "../assets/female.png";
import { useUserStore } from '../store/useUserStore';

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  pet: Object,
  petTypes: Array,
  breeds: Array,
});

const data = reactive({ visibleView: false, visibleEditing: false });

const openModal = () => {
  data.visibleView = true;
};

const openEditModal = () => {
  data.visibleEditing = true;
};

const closeModal = () => {
  data.visibleView = false;
};

const closeEditModal = () => {
  data.visibleEditing = false;
};

const openPetPage = () => {
  router.push({ path: '/', query: { petId: props.pet.id } });
};


const savePet = async (updatedPet) => {
  try {
    const formData = new FormData();
    formData.append('pet_name', updatedPet.name);
    formData.append('pet_description', updatedPet.status);
    formData.append('is_male', updatedPet.sex);
    formData.append('birth_date', updatedPet.birthDate);
    formData.append('user', userStore.info ? userStore.info.pk : null);
    formData.append('pet_type', updatedPet.type);
    formData.append('breed', updatedPet.breed);
    
    await updatePetProfile(updatedPet.id, formData);
    console.log('Pet profile updated successfully');
    
    // Обновляем данные питомца
    Object.assign(props.pet, updatedPet);
  } catch (error) {
    console.error('Failed to update pet profile:', error);
  }
  closeEditModal();
};

const getPetType = (typeId) => {
  const type = props.petTypes.find(type => type.id == typeId);
  return type ? type.type_name : 'Неизвестный тип';
};

const getBreed = (breedId) => {
  const breed = props.breeds.find(breed => breed.id == breedId);
  return breed ? breed.breed_name : 'Неизвестная порода';
};

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (today.getDate() < birth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  if (years === 0) {
    if (months === 0) {
      return "< месяца";
    } else {
      return `${months} ${declineWord(months, ['месяц', 'месяца', 'месяцев'])}`;
    }
  } else {
    return `${years} ${declineWord(years, ['год', 'года', 'лет'])} ${months} ${declineWord(months, ['месяц', 'месяца', 'месяцев'])}`;
  }
};

const declineWord = (number, words) => {
  number = Math.abs(number) % 100;
  const lastDigit = number % 10;

  if (number > 10 && number < 20) {
    return words[2];
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return words[1];
  }
  if (lastDigit === 1) {
    return words[0];
  }
  return words[2];
};


const sexIcon = computed(() => {
  const sex = (props.pet.sex === 'true' || props.pet.sex === true);
  if (sex === true) {
    return maleIcon;
  } else {
    return femaleIcon;
  }
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
