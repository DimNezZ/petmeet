<template>
  <div class="footer">
    <div class="wrapper">
      <Logo caption="©PetMeet" variant="footer" class="test" />
    </div>
  </div>
</template>

<script setup>
import Logo from "../Logo.vue";
</script>

<style scoped>
.footer {
  background-image: url(../../assets/footer.svg);
  background-size: cover;
}
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.test {
  margin-left: 90px;
}
</style>
