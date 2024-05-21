<template>
    <div class="form_textarea">
        <textarea class="textarea_text"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        :maxlength="maxlength">
        </textarea>
        <label v-if="label" :for=name class="textarea_label">{{ label }}</label>
    </div>
</template>

<script setup>

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: 90
  }
})

</script>

<style scoped>

.form_textarea{
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
    resize: none;
    min-height: 200px;

}
.textarea_label{
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