<template>
  <div class="wrapper">
    <img class="image" alt="" src="../assets/logo.png" />
    <div
      class="caption"
      :class="{
        logo_header: props.variant === 'header',
        logo_footer: props.variant === 'footer',
      }"
    >
      {{ caption }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  caption: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 0;
}
.image {
  width: 110px;
  height: 110px;
  margin: 0 20px;
}
.caption {
  font-weight: bold;
  font-size: 32px;
}
.logo_header {
  color: #000;
}
.logo_footer {
  color: #fff;
}
</style>
