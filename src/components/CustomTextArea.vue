<template>
  <div class="form_textarea">
    <textarea
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :maxlength="maxlength"
      :readonly="readonly"
      class="textarea_text"
      @input="emit('input', $event)"
    >
    </textarea>
    <label v-if="label" :for="id" class="textarea_label">{{ label }}</label>
  </div>
</template>

<script setup>
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
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 90,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['input']);
</script>

<style scoped>
.form_textarea {
  width: 100%;
  position: relative;
}
.textarea_text {
  width: 100%;
  border-radius: 10px;
  border: 2px solid #77a42c;
  padding: 15px 20px;
  font-size: 26px;
  box-sizing: border-box;
  resize: none;
  min-height: 200px;
}
.textarea_label {
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
.textarea_text:focus {
  outline: 0;
}
</style>
