<template>
  <slot></slot>
</template>

<script setup>
import { getMe } from "../api/user";
import { useUserStore } from "../store/useUserStore";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  getMe().then((user) => {
    userStore.setUser(user);
  });
});
</script>
