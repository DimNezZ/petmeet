<template>
  <div v-if="open" @click.self="emit('close')" class="profilecard_background profilecard_visible">
    <div class="profilecard_container">
      <div class="column">
        <div class="profilecard_photo">
          <img :src="user?.photo ?? '../assets/profile.svg'" alt="">
          <CustomButton variant="secondary">Добавить фото</CustomButton>
          <CustomButton variant="destructive">Удалить фото</CustomButton>
        </div>
        <div class="profilecard_inputs">
          <CustomInput v-model="editedUser.username" name="login" label="Логин" />
          <div class="geolocation-section">
            <CustomButton variant="primary" @click="getLocation">Получить геолокацию</CustomButton>
            <div v-if="location" class="row">
              <p style="margin-left: 10px;">Широта: {{ location.latitude }}</p>
              <p style="margin-left: 10px;">Долгота: {{ location.longitude }}</p>
            </div>
          </div>
          <CustomInput v-model="editedUser.phone_number" name="phone" label="Номер телефона" />
          <CustomInput v-model="editedUser.email" name="email" label="Электронная почта" />
          <CustomInput v-model="editedUser.password" name="password" type="password" label="Пароль" />
          <CustomInput v-model="editedUser.confirm_password" name="confirm_password" type="password" label="Подтверждение пароля" />
        </div>
      </div>
      <CustomButton @click="saveChanges">Сохранить</CustomButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import CustomButton from './CustomButton.vue';
import CustomInput from './CustomInput.vue';
import { updateUser } from '../api/user.js';

const props = defineProps({
  open: Boolean,
  user: Object
});

const emit = defineEmits(['close', 'save']);

const location = ref(null);
const error = ref(null);

const editedUser = reactive({
  username: '',
  phone_number: '',
  email: '',
  password: '',
  confirm_password: '',
  photo: '',
  latitude: '',
  longitude: ''
});

watch(() => props.user, (newUser) => {
  if (newUser) {
    Object.assign(editedUser, newUser);
  }
}, { immediate: true });

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        editedUser.latitude = position.coords.latitude;
        editedUser.longitude = position.coords.longitude;
        error.value = null;
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            error.value = "Пользователь отклонил запрос на геолокацию.";
            break;
          case err.POSITION_UNAVAILABLE:
            error.value = "Информация о местоположении недоступна.";
            break;
          case err.TIMEOUT:
            error.value = "Время ожидания запроса истекло.";
            break;
          default:
            error.value = "Произошла неизвестная ошибка.";
            break;
        }
      }
    );
  } else {
    error.value = "Геолокация не поддерживается этим браузером.";
  }
};

const saveChanges = () => {
  if (editedUser.password !== editedUser.confirm_password) {
    error.value = "Пароли не совпадают.";
    return;
  }

  const cleanedUser = Object.fromEntries(
    Object.entries(editedUser).filter(([key, value]) => value !== '' && key !== 'photo')
  );

  updateUser(cleanedUser).then(() => {
    emit('save', editedUser);
    emit('close');
  }).catch((err) => {
    error.value = "Ошибка при сохранении данных: " + err.message;
  });
};
</script>

<style scoped>
.profilecard_background {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.row{
  display: flex;
}
.profilecard_visible {
  display: flex;
}
.profilecard_container {
  background-color: #f3f5f6;
  padding: 30px;
  width: 800px;
  border-radius: 10px;
}
.column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profilecard_photo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.profilecard_photo > img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 40px;
}
.profilecard_inputs {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
}
.geolocation-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
