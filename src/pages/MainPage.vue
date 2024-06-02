<template>
  <DataWrapper>
    <Header />
    <div>
      <MainPetCard />
    </div>
    <Footer />
  </DataWrapper>
</template>

<script setup>
import Header from '../components/blocks/Header.vue';
import MainPetCard from '../components/blocks/MainPetCard.vue';
import Footer from '../components/blocks/Footer.vue';
import DataWrapper from '../components/DataWrapper.vue';
</script>
