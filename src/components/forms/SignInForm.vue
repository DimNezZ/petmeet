<template>
    <Container>
        <div class="signin_form">
            <div class="tabs">
            </div>
            <div class="form_greeting">Присоединяйтесь к нам</div>
            <div class="column">
                <div class="input_wrapper">
                    <div class="input_caption">Имя</div>
                    <input type="email" class="signin_input">
                </div>
                <div class="input_wrapper">
                    <div class="input_caption">Фамилия</div>
                    <input type="email" class="signin_input">
                </div>
            </div>
            <div class="input_wrapper">
                <div class="input_caption">Электронная почта</div>
                <input type="email" class="signin_input">
            </div>
            <div class="input_wrapper">
                <div class="input_caption">Пароль</div>
                <input type="password" class="signin_input">
            </div>
            <Button class="signin_button">Зарегистрироваться</Button>
        </div>
    </Container>
</template>

<script setup>
import Container from '../Container.vue';
import Button from '../Button.vue';
</script>

<style scoped>
.signin_form{
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 570px;
    border: 1px solid black;
}
.input_wrapper{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.column{
    display: flex;
    flex-direction: row;
    gap: 30px;
}

.form_greeting{
    margin: 10px 0;
    font-size: 26px;
}
.signin_input{
    font-family: inherit;
    font-size: 18px;
    padding: 8px 6px;
    border: 1px solid #80c3fd;
    transition: 0.4s ease-in-out;
}
.signin_input:focus{
    border-color: #77a42c;
    outline: 0;
}
.input_caption{
    text-align: start;
    margin-bottom: 8px;
}
.signin_link{
    margin: 10px 0;
    text-align: end;

}
.signin_link > a{
    color: #80c3fd;
    transition: 0.4s;
}
.signin_link > a:hover{
    color: #77a42c; 
}
.signin_button{
    display: block;
    margin: 15px auto 0 auto;
    width: 100%;
    background-color: #80c3fd;
    color: #eeeef6;
    font-size: 26px;
    border: none;
    transition: 0.4s;
    outline: none;
}
.signin_button:hover{
    background-color: #77a42c;
}
.login_button:active{
    background-color: #678f26;
}
</style>