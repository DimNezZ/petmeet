<template>
  <div class="form_select">
    <label v-if="label" :for="name" class="select_label">{{ label }}</label>
    <select :name="name" :id="id" :value="modelValue" @change="updateValue($event.target.value)" v-bind="$attrs">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  name: {
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
  },
  options: {
    type: Array,
    default: () => []
  }
})

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.form_select {
  width: 100%;
  position: relative;
  margin-bottom: 20px;
}
.select_label {
  font-size: 16px;
  display: block;
  margin-bottom: 8px;
}
select {
  width: 100%;
  border-radius: 10px;
  border: 2px solid #77A42C;
  padding: 15px 20px;
  font-size: 26px;
  box-sizing: border-box;
}
</style>
