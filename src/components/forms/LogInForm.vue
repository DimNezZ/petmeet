<template>
  <div class="login_form">
    <div class="form_greeting">Добро пожаловать</div>
    <div class="login_control">
      <CustomInput
      name="login"
      placeholder="Логин"
      :value="state.login"
      @input="state.login = $event.target.value"
    />
    <CustomError :errors="formErrors.username"/>
    </div>
    <div class="login_control">
      <CustomInput
      type="password"
      name="password"
      placeholder="Пароль"
      :value="state.password"
      @input="state.password = $event.target.value"
    />
    <CustomError :errors="formErrors.password"/>
    </div>   
    <div class="login_link"><a href="">Забыли пароль?</a></div>
    <CustomButton @click="onLoginClick" class="login_button"
      >Войти</CustomButton>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { login } from "../../api/user";
import { useUserStore } from "../../store/useUserStore";
import CustomButton from '../CustomButton.vue';
import CustomError from '../CustomError.vue';
import CustomInput from '../CustomInput.vue';

const router = useRouter();
const userStore = useUserStore();

const state = reactive({
  login: "",
  password: "",
});

const formErrors = reactive({
  username: [],
  password: [],
});

function onLoginClick() {
  login(state.login, state.password).then((arg) => {
    userStore.setToken(arg.access);
    userStore.fetchUser();
    router.push("/");
  }).catch((arg) => {
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
</script>

<style scoped>
.login_form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}
.form_greeting {
  margin: 10px 0;
  font-size: 38px;
}
.login_control{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.login_input {
  font-family: inherit;
}
.login_link {
  text-align: center;
}
.login_link > a {
  color: #000;
  font-size: 18px;
  transition: 0.4s;
  text-decoration: underline;
}

.login_button {
  display: block;
  margin: 0 auto;
  width: 260px;
  font-size: 22px;
}
</style>
