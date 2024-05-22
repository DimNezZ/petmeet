<template>
  <div class="main-container">
    <PetFilter class="filter-container" />
    <div class="card-container">
      <div v-if="error" class="error_container">
        <img src="../../assets/error.svg" alt="Error image" class="error_image">
      </div>
      <div v-else-if="card" class="maincard_wrapper">
        <div class="maincard_image_container">
          <img :src="card.image ?? '/profile-default.svg'" alt="Pet image" class="maincard_image">
          <div class="description_overlay">
            <div class="description_text">
              {{ card.pet_description }}
            </div>
          </div>
        </div>
        <div class="maincard_description">
          <div class="maincard_pet_characteristics">
            <div class="maincard_pet_name">{{ card.pet_name }}</div>
            <div class="maincard_pet_age">{{ calculateAge(card.birth_date) }}</div>
          </div>
          <div class="maincard_pet_characteristics">
            <div class="maincard_pet_breed">{{ getAnimalType(card.pet_type) }}, {{ getBreed(card.breed) }}</div>
            <img :src="getSexIcon(card.is_male)" :alt="card.is_male ? 'Male' : 'Female'" class="maincard_pet_sex" />
          </div>
        </div>
        <div class="maincard_button_container">
          <div class="maincard_button" @click="likeCard">
            <img src="../../assets/like_button.svg" alt="">
          </div>
          <div class="maincard_button" @click="dislikeCard">
            <img src="../../assets/disslike_button.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PetFilter from '../PetFilter.vue';
import { lookupCard, getPetTypes, getBreeds, likePet } from '../../api/pets';
import male from '../../assets/male.png';
import female from '../../assets/female.png';

const route = useRoute();
const props = defineProps({
  petId: String
});

const card = ref(null);
const animalTypes = ref([]);
const breeds = ref([]);
const error = ref(false); // Добавлено состояние ошибки
const BASE_URL = 'https://petmeet.space';

const loadCardData = async (id) => {
  try {
    const cardData = await lookupCard(id);
    card.value = {
      ...cardData,
      image: `${BASE_URL}${cardData.photo}` // Преобразуем поле photo в полный URL
    };
    error.value = false; // Сбрасываем состояние ошибки при успешной загрузке
  } catch (err) {
    console.error('Error loading card data:', err);
    error.value = true; // Устанавливаем состояние ошибки при ошибке
  }
};

const loadOptionsData = async () => {
  try {
    const [typesData, breedsData] = await Promise.all([getPetTypes(), getBreeds()]);
    animalTypes.value = typesData;
    breeds.value = breedsData;
  } catch (err) {
    console.error('Error loading options data:', err);
  }
};

const getAnimalType = (typeId) => {
  const type = animalTypes.value.find(type => type.id === typeId);
  return type ? type.type_name : 'Неизвестный тип';
};

const getBreed = (breedId) => {
  const breed = breeds.value.find(breed => breed.id === breedId);
  return breed ? breed.breed_name : 'Неизвестная порода';
};

const getSexIcon = (isMale) => {
  return isMale ? male : female;
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

const dislikeCard = async () => {
  try {
    await loadCardData(props.petId);
  } catch (err) {
    console.error('Error disliking card:', err);
    error.value = true; // Устанавливаем состояние ошибки при ошибке
  }
};

const likeCard = async () => {
  try {
    await likePet(props.petId, card.value.id);
    // Можете также добавить логику для обновления карточки после лайка, если необходимо
    await loadCardData(props.petId);
  } catch (err) {
    console.error('Error liking card:', err);
  }
};

onMounted(() => {
  loadOptionsData();
  if (props.petId) {
    loadCardData(props.petId);
  }
});

watch(() => props.petId, (newId) => {
  if (newId) {
    loadCardData(newId);
  }
});
</script>


  
<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Центрирование по вертикали */
  margin: 20px;
  height: 90vh; /* Высота контейнера, чтобы центрирование по вертикали работало */
}

.filter-container {
  flex: 0 0 400px; /* Фиксированная ширина */
  margin-right: 20px;
  height: auto; /* Высота по содержимому */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-left: 10%;
}

.maincard_wrapper {
  margin: 20px 0;
  width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.maincard_image_container {
  width: 550px;
  height: 550px;
  position: relative;
}
.maincard_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.description_overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  padding: 20px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
}
.description_text {
  color: white;
  font-size: 18px;
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
.maincard_pet_name, .maincard_pet_age {
  font-size: 32px;
}
.maincard_pet_name {
  font-weight: 700;
}
.maincard_button_container {
  display: flex;
  gap: 60px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, 295px);
}
.maincard_button {
  display: flex;
  border-radius: 50%;
  cursor: pointer;
}
</style>
