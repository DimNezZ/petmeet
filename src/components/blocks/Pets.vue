<template>
  <Container>
    <div class="pets_title">
      <div class="pets_caption">Питомцы</div>
      <img src="../../assets/paw.svg" alt="" class="pets_icon" />
    </div>
    <div class="pets_wrapper">
      <PetCard
        v-for="pet in pets"
        :key="pet.id"
        :pet="pet"
        :petTypes="petTypes"
        :breeds="breeds"
      />
      <div class="pets_add" @click="openAddModal">
        <img src="../../assets/plus.svg" alt="" class="add_icon" />
      </div>
    </div>
  </Container>
  <PetModal
    :editing="true"
    :open="addModalVisible"
    @close="closeAddModal"
    :pet="emptyPet"
    :petTypes="petTypes"
    :breeds="breeds"
    @save="saveNewPet"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Container from "../Container.vue";
import { useUserStore } from '../../store/useUserStore';
import PetCard from "../PetCard.vue";
import PetModal from "../PetModal.vue";
import { getPets, getPetTypes, getBreeds, createPetProfile } from '../../api/pets.js';

const userStore = useUserStore();

const pets = ref([]);
const petTypes = ref([]);
const breeds = ref([]);
const addModalVisible = ref(false);

const emptyPet = ref({
  id: null,
  image: '',
  name: '',
  birthDate: '',
  type: null,
  breed: null,
  sex: true,
  status: '',
  user: userStore.info ? userStore.info.pk : null
});

const openAddModal = () => {
  emptyPet.value.user = userStore.info ? userStore.info.pk : null;
  addModalVisible.value = true;
};

const closeAddModal = () => {
  addModalVisible.value = false;
};

const saveNewPet = async (newPet) => {
  try {
    const formData = new FormData();
    formData.append('pet_name', newPet.name);
    formData.append('pet_description', newPet.status);
    formData.append('is_male', newPet.sex);
    formData.append('birth_date', newPet.birthDate);

    if (newPet.image instanceof File) {
      formData.append('photo', newPet.image);
    } else if (newPet.image) {
      const response = await fetch(newPet.image);
      const blob = await response.blob();
      formData.append('photo', blob, 'photo.jpg');
    }

    formData.append('user', userStore.info.pk);
    formData.append('pet_type', newPet.type);
    formData.append('breed', newPet.breed);

    const createdPet = await createPetProfile(formData);

    pets.value.push({
      id: createdPet.id,
      image: createdPet.photo,
      name: createdPet.pet_name,
      birthDate: createdPet.birth_date,
      type: createdPet.pet_type,
      breed: createdPet.breed,
      sex: createdPet.is_male,
      status: createdPet.pet_description
    });

    closeAddModal();
  } catch (error) {
    console.error('Failed to save new pet:', error);
  }
};

onMounted(async () => {
  console.log('Pets component mounted');
  if (!pets.value.length) { // Проверка на уже загруженные данные
    console.log('Loading pets data');
    try {
      await userStore.fetchUser();

      const [responsePetTypes, responseBreeds, responsePets] = await Promise.all([
        getPetTypes(),
        getBreeds(),
        getPets()
      ]);

      petTypes.value = responsePetTypes;
      breeds.value = responseBreeds;

      pets.value = responsePets.map(pet => ({
        id: pet.id,
        image: pet.photo,
        name: pet.pet_name,
        birthDate: pet.birth_date,
        type: pet.pet_type,
        breed: pet.breed,
        sex: pet.is_male,
        status: pet.pet_description
      }));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
});
</script>

<style scoped>
.pets_title {
  display: flex;
  gap: 20px;
  font-size: 36px;
}
.pets_icon {
  width: 50px;
  height: 50px;
}
.pets_wrapper {
  width: 100%;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
}
.pets_add {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  background-color: #77a42c;
  width: 150px;
  height: 150px;
  cursor: pointer;
  margin: 0 50px;
}
.add_icon {
  width: 90px;
  height: 90px;
}
</style>
