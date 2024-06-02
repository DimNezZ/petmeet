<template>
  <div class="header_wrapper">
    <div class="logo_container">
      <RouterLink to="/feed">
        <Logo caption="" variant="header" />
      </RouterLink>
    </div>
    <div class="image_container">
      <img src="../../assets/cloud1.png" alt="" />
      <img src="../../assets/cloud2.png" alt="" />
      <img src="../../assets/cloud3.png" alt="" />
    </div>
    <div class="personal_account">
      <img class="account_image" :src="user.photo" alt="" />
      <RouterLink to="/" class="header_link">
        <div class="account_name">{{ user.name }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/useUserStore';
import Logo from '../Logo.vue';

const user = useUserStore();
</script>

<style scoped>
.header_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #b6cced;
  box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.45);
}

.image_container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: relative;
  overflow-x: hidden;
}

.logo_container {
  margin-left: 90px;
  z-index: 1;
}

.personal_account {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 120px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px 15px;
  position: absolute;
  right: 10px;
  z-index: 3;
}

.account_image {
  width: 90px;
  height: 90px;
}

.account_name {
  font-size: 24px;
}

.header_link {
  color: inherit;
  text-decoration: none;
}
</style>
