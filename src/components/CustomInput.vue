<template>
  <div class="form_input">
    <input
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :readonly="readonly"
      class="input_text"
      @input="emit('input', $event)"
    />
    <label v-if="label" :for="id" class="input_label">{{ label }}</label>
  </div>
</template>

<script setup>
const emit = defineEmits(['input']);

defineProps({
  id: {
    type: String,
    default: undefined,
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.form_input {
  width: 100%;
  position: relative;
}
.input_text {
  width: 100%;
  border-radius: 10px;
  border: 2px solid #77a42c;
  padding: 15px 20px;
  font-size: 26px;
  box-sizing: border-box;
}
.input_label {
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #77a42c;
  padding: 2px;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(30px, -50%);
}
.input_text:focus {
  outline: 0;
}
</style>
