<template>
  <div class="pet-profile">
    <div class="pet-header">
      <img :src="petImage" alt="Pet Image" class="pet-image"/>
      <h2 class="pet-name">{{ petName }}</h2>
    </div>
    <div class="filters">
      <CustomSelect
        label="Животное"
        name="animal"
        :options="animalOptions"
        v-model="selectedAnimal"
      />
      <CustomSelect
        label="Порода"
        name="breed"
        :options="breedOptions"
        v-model="selectedBreed"
      />
      <CustomSelect
        label="Пол"
        name="gender"
        :options="genderOptions"
        v-model="selectedGender"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPetProfile, getPetTypes, getBreeds } from '../api/pets'
import CustomSelect from './CustomSelect.vue'

// Имя питомца и его изображение
const petName = ref('')
const petImage = ref('')

// Опции для выпадающих списков
const animalOptions = ref([])
const breedOptions = ref([])
const genderOptions = ref([
  { value: 'male', text: 'Мужской' },
  { value: 'female', text: 'Женский' }
])

const selectedAnimal = ref('')
const selectedBreed = ref('')
const selectedGender = ref('')

const route = useRoute()
const petId = route.query.petId

onMounted(async () => {
  try {
    if (petId) {
      const petData = await getPetProfile(petId)
      petName.value = petData.pet_name
      petImage.value = petData.photo
      selectedAnimal.value = petData.pet_type
      selectedBreed.value = petData.breed
      selectedGender.value = petData.sex ? 'male' : 'female'
    }

    const [petTypes, breeds] = await Promise.all([getPetTypes(), getBreeds()])
    animalOptions.value = petTypes.map(type => ({ value: type.id, text: type.type_name }))
    breedOptions.value = breeds.map(breed => ({ value: breed.id, text: breed.breed_name }))
  } catch (error) {
    console.error('Error loading pet data:', error)
  }
})
</script>

<style scoped>
.pet-profile {
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.pet-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.pet-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.pet-name {
  font-size: 24px;
  font-weight: bold;
}

.filters {
  display: flex;
  flex-direction: column;
}
</style>
