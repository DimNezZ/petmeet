<template>
  <div class="header_wrapper">
    <RouterLink to="/">
      <div class="logo_container">
        <Logo caption="" variant="header" />
      </div>
    </RouterLink>
    <div class="image_container">
      <img src="../../assets/cloud1.png" alt="cloud1" />
      <img src="../../assets/cloud2.png" alt="cloud2" />
      <img src="../../assets/cloud3.png" alt="cloud3" />
    </div>
    <div class="personal_account">
      <img
        class="account_image"
        :src="user.info?.photo ?? '/profile-default.svg'"
        alt=""
      />
      <RouterLink to="/account" class="header_link"
        ><div class="account_name">{{ user.info?.username }}</div></RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../store/useUserStore";
import Logo from "../Logo.vue";

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
