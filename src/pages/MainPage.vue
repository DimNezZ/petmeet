<template>
  <DataWrapper>
    <Header />
    <MainPetCard :petId="petId" />
    <Footer />
  </DataWrapper>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from "../components/blocks/Header.vue";
import MainPetCard from "../components/blocks/MainPetCard.vue";
import Footer from "../components/blocks/Footer.vue";
import DataWrapper from "../components/DataWrapper.vue";

const route = useRoute();
const petId = ref(route.query.petId);

onMounted(() => {
  if (!petId.value) {
    console.error("Pet ID not provided");
  }
});
</script>
