<template>
    <Container>
        <div class="pets_title">
            <div class="pets_caption">Питомцы</div>
            <img src="../../assets/paw.svg" alt="" class="pets_icon">
        </div>
        <div class="pets_wrapper">
            <PetCard
            v-bind="pet"
            v-for="pet in pets"
            :key="pet.id"/>
            <div class="pets_add"><img src="../../assets/plus.svg" alt="" class="add_icon"></div>
        </div>
    </Container>


</template>

<script setup>
import Container from '../Container.vue';
import PetCard from '../PetCard.vue';

import dog from '../../assets/dog.jpg';
import chinchilla from '../../assets/chinchilla.jpg';
import cat from '../../assets/cat.jpg';


const pets = [
    {
        id: 1,
        image: dog,
        name: 'Картошка',
        age: '2 года',
        type: 'Cобака',
        breed: 'Корги',
        sex: 1,
        status: 'Ищет для себя верных друзей потому, что не любит оставаться один'
    },
    {
        id: 2,
        image: chinchilla,
        name: 'Картошка',
        age: '1 год',
        type: 'Шиншилла',
        breed: 'Обыкновенная',
        sex: 0,
        status: 'Ищет для себя верных друзей потому, что не любит оставаться один'
    },
    {
        id: 3,
        image: cat,
        name: 'Барсик',
        age: '4 года',
        type: 'Кот',
        breed: 'Беспородный',
        sex: 1,
        status: 'Ищет для себя верных друзей потому, что не любит оставаться один'
    },   
    {
        id: 4,
        image: dog,
        name: 'Картошка',
        age: '2 года',
        type: 'Cобака',
        breed: 'Корги',
        sex: 1,
        status: 'Ищет для себя верных друзей потому, что не любит оставаться один'
    },

]
</script>

<style scoped>
.pets_title{
    display: flex;
    gap: 20px;
    font-size: 36px;
}
.pets_icon{
    width: 50px;
    height: 50px;
}
.pets_wrapper{
    width: 100%;
    margin: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px;
}
.pets_add{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    background-color: #77A42C;
    width: 150px;
    height: 150px;
    cursor: pointer;
    margin: 0 50px;
}
.add_icon{
    width: 90px;
    height: 90px;
}
</style>