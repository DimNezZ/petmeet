<template>
  <button
    type="button"
    class="button"
    :class="{
      button_active: active,
      button_add: props.variant === 'secondary',
      button_delete: props.variant === 'destructive',
    }"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
});
</script>

<style scoped>
.button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.4);
  outline: none;
  color: #fff;
  border-radius: 10px;
  background-color: #77a42c;
  background-image: url(../assets/leaves.png);
  transition: 0.4s;
}
.button_active {
  border-color: rgb(255, 255, 255);
}
.button_add {
  background-color: #b6cced;
  background-image: none;
}
.button_delete {
  background-color: #ff2424;
  background-image: none;
}
.button:active {
  background-color: #678f26;
}
</style>
