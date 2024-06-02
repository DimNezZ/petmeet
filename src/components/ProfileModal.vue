<template>
  <div
    :class="{ profilecard_visible: props.open }"
    class="profilecard_background"
    @click.self="emit('close')"
  >
    <div class="profilecard_container">
      <div class="column">
        <div class="profilecard_photo">
          <img src="/profile-default.svg" alt="" />
          <CustomButton variant="secondary">Добавить фото</CustomButton>
          <CustomButton variant="destructive">Удалить фото</CustomButton>
        </div>
        <div class="profilecard_inputs">
          <CustomInput name="login" label="Логин" />
          <CustomInput name="city" label="Город" />
          <CustomInput name="phone" label="Номер телефона" />
          <CustomInput name="email" label="Электронная почта" />
          <CustomInput name="password" type="password" label="Пароль" />
          <CustomInput name="confirm_password" type="password" label="Подтверждение пароля" />
        </div>
      </div>
      <CustomButton>Сохранить</CustomButton>
    </div>
  </div>
</template>

<script setup>
import CustomButton from './CustomButton.vue';
import CustomInput from './CustomInput.vue';

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(['close']);
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
</style>
