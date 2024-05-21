<template>
    <div class="form_input">
        <input class="input_text"
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        @input="emit('input', $event)">
        <label v-if="label" :for=name class="input_label test">{{ label }}</label>
    </div>
</template>

<script setup>

const emit = defineEmits(['input'])

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>

.form_input{
    width: 100%;
    position: relative;
}
.input_text {
    width: 100%;
    border-radius: 10px;
    border: 2px solid #77A42C;
    padding: 15px 20px;
    font-size: 26px;
    box-sizing: border-box;

}
.input_label{
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
.input_text:focus {
    outline: 0;
}

</style>