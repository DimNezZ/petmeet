<template>
    <div class="profile_wrapper">
        <Container class="profile">
            <img src="../../assets/prof.jpg" alt="" class="profile_image">
            <div class="profile_data">
                <div class="profile_description">
                    <div class="profile_name">Имя пользователя</div>
                    
                    <div class="profile_characteristic">
                        <img src="../../assets/pet.png" alt="" class="profile_icon">
                        <div>Количество питомец</div>
                    </div>
                    <div class="profile_characteristic">
                        <img src="../../assets/geo.png" alt="" class="profile_icon">
                        <div>Геопозиция</div>
                    </div>
                    <div class="profile_characteristic">
                        <img src="../../assets/telephone.png" alt="" class="profile_icon">
                        <div>7(999)-999-99-99</div>
                    </div>
                </div>
                <CustomButton @click="data.visible = true">Редактировать профиль</CustomButton>
            </div>
            <!-- <img src="../../assets/mountain.png" alt="" class="mountain"> -->
        </Container>
    </div>
    <Pets/>
    <ProfileModal :open="data.visible" @close="data.visible = false"/>


</template>

<script setup>
import { reactive, computed } from 'vue'
import Container from "../Container.vue";
import CustomButton from "../CustomButton.vue";
import ProfileModal from "../ProfileModal.vue";
import Pets from "../blocks/Pets.vue";
// import IconWithText from "../IconWithText.vue";

const data = reactive({visible:false});
</script>

<style scoped>
.profile_wrapper{
    background-image: url(../../assets/mountain.png);
    background-repeat: no-repeat;
    background-position: right bottom;
}
.profile{
    display: flex;
    align-items: center;
    gap:100px;
    padding: 60px 0;
    border-bottom: 1px solid #000;
    position: relative;
    margin-bottom: 30px;
}
.profile_image{
    width: 300px;
    height: 300px;
    border-radius: 10px;
    border: 2px solid #fff;
    box-sizing: border-box;
}
.profile_data{
    display: flex;
    flex-direction: column;
    gap: 60px;
}
.profile_description{
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #b7d3f6;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 15px;
    
}
.profile_characteristic{
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 20px;
}
.profile_characteristic > div {
    max-width: 250px;
    text-align: left;
}
.profile_name{
    font-size: 30px;
    margin-bottom: 35px;
}
.profile_icon{
    width: 25px;
    height: 25px;
    object-fit: contain;
}
.mountain{
    position: absolute;
    right: -25%;
    bottom: -1px;
}
</style>