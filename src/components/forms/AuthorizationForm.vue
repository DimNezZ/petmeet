<template>
    <div class="wrapper">
        <img v-if="data.form == 'Вход'" src="../../assets/tree.svg" class="image1 image " alt="">
        <img v-if="data.form == 'Вход'" src="../../assets/tree.svg" class="image2 image" alt="">
        <img v-if="data.form == 'Регистрация'" src="../../assets/fir.png" class="image3 image" alt="">
        <img v-if="data.form == 'Регистрация'" src="../../assets/fir.png" class="image4 image" alt="">
        <Container>
            <div class="authorization_form">
                <div class="authorization_tabs">
                    <CustomButton :active="data.form == 'Вход'" @click="data.form = 'Вход'"  class="authorization_button">Вход</CustomButton>
                    <CustomButton :active="data.form == 'Регистрация'" @click="data.form = 'Регистрация'"  class="authorization_button">Регистрация</CustomButton>
                </div>
                <LogInForm v-if="data.form == 'Вход'"/> 
                <SignInForm v-else="data.form == 'Регистрация'" @success="data.form = 'Вход'"/>
            </div>
        </Container>
    </div>  
</template>

<script setup>
import Container from '../Container.vue';
import LogInForm from './LogInForm.vue';
import SignInForm from './SignInForm.vue';
import CustomButton from '../CustomButton.vue';
import { reactive } from 'vue';

const data = reactive({ form: "Вход" });
</script>

<style scoped>
.wrapper{
    display: grid;
    place-items: center;
    position: relative;
    min-height: 100vh;
    
}
.authorization_form{
    margin: 0 auto;
    padding: 40px 120px;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.26);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    box-sizing: border-box;
    min-height: 552px;
    max-width: 660px;
}
.authorization_tabs{
    display: flex;
    gap:20px;
    justify-content: center;
}
.authorization_button{
    width: 200px;
    font-size: 22px;
}
.image{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(var(--x, 0px) - 50%), calc(var(--y, 0px) - 50%));
}
.image1{
    --x: -350px;
    --y: 120px;
}
.image2{
    --x: 400px;
    --y: -120px;
}
.image3{
    --x: -330px;
    --y: -120px;
}
.image4{
    --x: 350px;
    --y: 120px;
}


</style>