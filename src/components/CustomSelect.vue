<template>
  <div class="form_select">
    <select
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :readonly="readonly"
      class="select_text"
      @change="emit('change', $event)"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ renderOption(option) }}
      </option>
    </select>
    <label v-if="label" :for="id" class="select_label">{{ label }}</label>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: undefined,
  },
  value: {
    type: [String, Number],
    default: '',
  },
  name: {
    type: String,
    default: '',
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
  options: {
    type: Array,
    default: () => [],
  },
  renderOption: {
    type: Function,
    default: value => value,
  },
});

const emit = defineEmits(['change']);
</script>

<style scoped>
.form_select {
  width: 100%;
  position: relative;
}
.select_text {
  width: 100%;
  border-radius: 10px;
  border: 2px solid #77a42c;
  padding: 15px 20px;
  font-size: 26px;
  box-sizing: border-box;
}
.select_label {
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
