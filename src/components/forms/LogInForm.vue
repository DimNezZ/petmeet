<template>
    <Container>
        <div class="login_form">
            <div class="tabs">
            </div>
            <div class="form_greeting">Добро пожаловать</div>
            <div class="input_wrapper">
                <div class="input_caption">Электронная почта</div>
                <input type="email" class="login_input">
            </div>
            <div class="input_wrapper">
                <div class="input_caption">Пароль</div>
                <input type="password" class="login_input">
            </div>
            <div class="login_link"><a href="">Забыли пароль?</a> </div>
            <Button class="login_button">Войти</Button>
        </div>
    </Container>
</template>

<script setup>
import Container from '../Container.vue';
import Button from '../Button.vue';
</script>

<style scoped>
.login_form{
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
.form_greeting{
    margin: 10px 0;
    font-size: 26px;
}
.login_input{
    font-size: 18px;
    padding: 8px 6px;
    border: 1px solid #80c3fd;
    font-family: inherit;
    transition: 0.4s ease-in-out;
}
.login_input:focus{
    border-color: #77a42c;
    outline: 0;
}
.input_caption{
    text-align: start;
    margin: 10px 0;
}
.login_link{
    text-align: end;
}
.login_link > a{
    color: #80c3fd;
    transition: 0.4s;
}
.login_link > a:hover{
    color: #77a42c; 
}
.login_button{
  display: block;
  margin: 0 auto;
  width: 100%;
  background-color: #80c3fd;
  color: #eeeef6;
  font-size: 26px;
  border: none;
  transition: 0.4s;
  outline: none; 
}
.login_button:hover{
    background-color: #77a42c;
}
.login_button:active{
    background-color: #678f26;
}
</style>