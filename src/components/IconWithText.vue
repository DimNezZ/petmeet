<template>
    <div class="characteristic">
        <img src={{ path }} alt="">
        <div></div>  
    </div>
</template>

<script setup>

const prosp = defineProps({
    path:{
        type: String,
        default: "../assets/question.png"
    }
})
</script>

<style scoped>
.characteristic{
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 20px;
}
.characteristic > div {
    max-width: 250px;
    text-align: left;
}
.icon{
    width: 25px;
    height: 25px;
    object-fit: contain;
}
</style>