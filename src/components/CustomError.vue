<template>
  <div v-if="props.errors.length" class="errors">
    <div v-for="(error, index) in props.errors" :key="index" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  errors: {
    type: Array,
    default: () => []
  },
});
</script>

<style scoped>
.errors {
  display: flex;
  flex-direction: column;
}
.error {
  color: red;
  text-align: left;
}
</style>
