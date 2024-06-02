<template>
  <div class="signin_form">
    <div class="form_greeting">Присоединяйтесь к нам</div>
    <div class="signin_control">
      <CustomInput
        type="text"
        name="login"
        placeholder="Логин"
        class="signin_input"
        :value="formData.username"
        @input="formData.username = $event.target.value"
      />
      <CustomError :errors="formErrors.username" />
    </div>

    <div class="signin_control">
      <CustomInput
        type="email"
        name="email"
        placeholder="Электронная почта"
        class="signin_input"
        :value="formData.email"
        @input="formData.email = $event.target.value"
      />
      <CustomError :errors="formErrors.email" />
    </div>
    <div class="signin_control">
      <CustomInput
        type="password"
        name="password"
        placeholder="Пароль"
        class="signin_input"
        :value="formData.password"
        @input="formData.password = $event.target.value"
      />
      <CustomError :errors="formErrors.password" />
    </div>
    <CustomButton class="signin_button" @click="onSingInClick">Зарегистрироваться</CustomButton>
  </div>
</template>

<script setup>
import CustomInput from '../CustomInput.vue';
import CustomButton from '../CustomButton.vue';
import CustomError from '../CustomError.vue';
import { reactive } from 'vue';
import { signUp } from '../../api/user';

const formData = reactive({
  username: '',
  email: '',
  password: '',
});

const formErrors = reactive({
  username: [],
  email: [],
  password: [],
});

function onSingInClick() {
  signUp(formData.username, formData.email, formData.password)
    .then(() => {
      emit('success');
    })
    .catch(arg => {
      const responseErrors = arg.response.data;
      for (const key in formErrors) {
        if (responseErrors[key]) {
          formErrors[key] = responseErrors[key];
        } else {
          formErrors[key] = [];
        }
      }
    });
}

const emit = defineEmits(['success']);
</script>

<style scoped>
.signin_form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}
.form_greeting {
  margin: 10px 0;
  font-size: 38px;
}
.signin_control {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.signin_input {
  font-family: inherit;
}
.signin_button {
  display: block;
  margin: 0 auto;
  width: 260px;
  font-size: 22px;
}
</style>
