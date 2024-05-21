<template>
    <div @click.self="emit('close')" :class="{petcard_visible: props.open}" class="petcard_background">
        <div class="petcard_container">
            <div class="column">
                <div class="petcard_photo">
                    <img src="../assets/profile.svg" alt="">
                    <CustomButton variant="secondary">Добавить фото</CustomButton>
                    <CustomButton variant="destructive">Удалить фото</CustomButton>  
                </div>
                <div class="petcard_inputs">
                    <CustomInput name="name" label="Имя"/>
                    <CustomInput name="type" label="Тип животного"/>
                    <CustomInput name="breed " label="Порода"/>
                    <CustomInput name="sex" label="Пол"/>
                    <CustomInput name="age" type="date" label="Дата рождения"/>
                    <CustomTextArea name="text" label="Описание"/>
                </div>
            </div>
            <CustomButton>Сохранить</CustomButton>
        </div>
    </div> 
</template>

<script setup>
import CustomButton from './CustomButton.vue';
import CustomInput from './CustomInput.vue'
import CustomTextArea from './CustomTextArea.vue';

const props = defineProps({
    open: Boolean
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.petcard_background{
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}
.petcard_visible {
    display: flex;
}
.petcard_container{
    background-color: #f3f5f6;
    padding: 30px;
    width: 800px;
    border-radius: 10px;
}
.column{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.petcard_photo{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.petcard_photo > img {
    width: 240px;
    height: 240px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 40px;
}
.petcard_inputs{
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
}
.petcard_text{
    min-height: 140px;
}
</style>