<template>
  <div class="form_textarea">
    <textarea class="textarea_text"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      v-bind="$attrs"></textarea>
    <label v-if="label" :for="name" class="textarea_label">{{ label }}</label>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
})

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.form_textarea {
  width: 100%;
  position: relative;
}
.textarea_text {
  width: 100%;
  border-radius: 10px;
  border: 2px solid #77A42C;
  padding: 15px 20px;
  font-size: 26px;
  box-sizing: border-box;
}
.textarea_label {
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #77A42C;
  padding: 2px;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(30px, -50%);
}
.textarea_text:focus {
  outline: 0;
}
</style>
