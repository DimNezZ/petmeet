<template>
    <div v-for="pet in pets" class="maincard_wrapper">
        <div class="maincard_image_container">
            <img :src="pet.image" alt="" class="maincard_image">
        </div>
        <div class="maincard_description">
            <div class="maincard_pet_characteristics">
                <div class="maincard_pet_name">{{ pet.name }}</div>
                <div class="maincard_pet_age">{{ pet.age }}</div>
            </div>
            <div class="maincard_pet_characteristics">
                <div class="maincard_pet_breed">{{ pet.breed }}</div>
                <img v-if="pet.sex" :src="male" alt="" class="maincard_pet_sex">
                <img v-else :src="female" alt="" class="maincard_pet_sex">
            </div>
        </div>
        <div class="maincard_button_container">
            <div class="maincard_button">
                <img src="../../assets/like_button.svg" alt="">
            </div>
            <div class="maincard_button">
                <img src="../../assets/disslike_button.svg" alt="" >
            </div>
        </div>
    </div>
</template>

<script setup>
import dog from '../../assets/dog.jpg';
import chinchilla from '../../assets/chinchilla.jpg';
import cat from '../../assets/cat.jpg';
import male from '../../assets/male.png';
import female from '../../assets/female.png';

const pets = [
    {
        id: 1,
        image: dog,
        name: 'Картошка',
        age: '2 года',
        breed: 'Корги',
        sex: 1
    },
    // {
    //     id: 2,
    //     image: chinchilla,
    //     name: 'Картошка',
    //     age: '1 год',
    //     breed: 'Шиншилла',
    //     sex: 0
    // },
    // {
    //     id: 3,
    //     image: cat,
    //     name: 'Барсик',
    //     age: '4 года',
    //     breed: 'Беспородный',
    //     sex: 1
    // }
]
</script>

<style scoped>
.maincard_wrapper{
    margin: 70px auto 100px auto;
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

}
.maincard_image_container{
    width: 550px;
    height: 550px;
}
.maincard_image{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
}
.maincard_description{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 30px 50px 30px;
    border-radius: 0 0 10px 10px;

    background: rgba(255, 255, 255, 0.26);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    box-sizing: border-box;
}
.maincard_pet_characteristics{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    font-size: 20px;
}
.maincard_pet_sex{
    width: 30px;
    height: 30px;
}
.maincard_pet_name, .maincard_pet_age{
    font-size: 32px;
}
.maincard_pet_name{
    font-weight: 700;
}
.maincard_button_container{
    display: flex;
    gap: 60px;
    position: absolute;
    top: 50%; left: 50%;
	transform: translate(-50%, 295px);
}
.maincard_button{
    display: flex;
    border-radius: 50%;
    cursor: pointer;
}

</style>