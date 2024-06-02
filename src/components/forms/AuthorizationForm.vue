<template>
  <div class="wrapper">
    <img
      v-if="currentForm === SIGN_IN_FORM"
      src="../../assets/tree.svg"
      class="image1 image"
      alt=""
    />
    <img
      v-if="currentForm === SIGN_IN_FORM"
      src="../../assets/tree.svg"
      class="image2 image"
      alt=""
    />
    <img
      v-if="currentForm === SIGN_UP_FORM"
      src="../../assets/fir.png"
      class="image3 image"
      alt=""
    />
    <img
      v-if="currentForm === SIGN_UP_FORM"
      src="../../assets/fir.png"
      class="image4 image"
      alt=""
    />
    <Container>
      <div class="authorization_form">
        <div class="authorization_tabs">
          <CustomButton
            class="authorization_button"
            :active="currentForm === SIGN_IN_FORM"
            @click="currentForm = SIGN_IN_FORM"
          >
            Вход
          </CustomButton>
          <CustomButton
            class="authorization_button"
            :active="currentForm === SIGN_UP_FORM"
            @click="currentForm = SIGN_UP_FORM"
          >
            Регистрация
          </CustomButton>
        </div>
        <LogInForm v-if="currentForm === SIGN_IN_FORM" />
        <SignInForm v-else @success="currentForm = SIGN_IN_FORM" />
      </div>
    </Container>
  </div>
</template>

<script setup>
import Container from '@/components/Container.vue';
import CustomButton from '@/components/CustomButton.vue';
import LogInForm from './LogInForm.vue';
import SignInForm from './SignInForm.vue';
import { ref } from 'vue';

const SIGN_IN_FORM = 'sign-in';
const SIGN_UP_FORM = 'sign-up';

const currentForm = ref(SIGN_IN_FORM);
</script>

<style scoped>
.wrapper {
  display: grid;
  place-items: center;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.authorization_form {
  margin: 0 auto;
  padding: 40px 120px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.26);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  box-sizing: border-box;
  min-height: 552px;
  max-width: 660px;
}

.authorization_tabs {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.authorization_button {
  width: 200px;
  font-size: 22px;
}

.image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(var(--x, 0px) - 50%), calc(var(--y, 0px) - 50%));
}

.image1 {
  --x: -350px;
  --y: 120px;
}

.image2 {
  --x: 400px;
  --y: -120px;
}

.image3 {
  --x: -330px;
  --y: -120px;
}

.image4 {
  --x: 350px;
  --y: 120px;
}
</style>
