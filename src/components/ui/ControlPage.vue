<template>
<div :class="`w-full flex items-center justify-between px-5 py-5 transition-colors duration-500 ${isActiveDarkmode ? 'bg-gray-800/95 border-gray-700' :'bg-white border-gray-200'}`">

    <button @click="showSidebar()" :class="`burguer ${toggleButton || 'active'}`">
        <span :class="`transition-colors duration-200 ${!isActiveDarkmode ? 'bg-gray-600' : 'bg-gray-300'}`"></span>
        <span :class="`transition-colors duration-200 ${!isActiveDarkmode ? 'bg-gray-600' : 'bg-gray-300'}`"></span>
        <span :class="`transition-colors duration-200 ${!isActiveDarkmode ? 'bg-gray-600' : 'bg-gray-300'}`"></span>
    </button>
    
    <button class="transition-colors duration-500" :class="isActiveDarkmode ? 'text-white':'text-gray-500'" @click="Darkmode()">
        <i class="text-2xl" :class="isActiveDarkmode ? 'ri-sun-line' :'ri-moon-line'"></i>
    </button>
    
</div>
</template>

<script>
import {defineComponent} from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
    data() {
        return {
            toggleButton: true
        }
    },
    computed: {
        ...mapState(['isActiveDarkmode'])
    },
    methods: {
        ...mapActions(['Darkmode','toggleButtonSidebar']),
        showSidebar(){
            this.toggleButton = !this.toggleButton  
            this.toggleButtonSidebar()   
        }
    }
})
</script>

<style>
.burguer{
    height: 40px;
    width: 40px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.burguer span{
    position: absolute;
    height: 3px;
    width: 30px;
    border-radius: 10px;
    transition: .5s transform;
}

.burguer span:nth-child(1){
    transform: translateY(10px);
}

.burguer span:nth-child(2){
    transform: translateY(-10px);
}
.burguer.active span:nth-child(1){
    transition-delay: .5s;
    transform: translateY(0) rotate(45deg);
}

.burguer.active span:nth-child(2){
    transition-delay: .5s;
    transform: translateY(0) rotate(-45deg);
}

.burguer.active span:nth-child(3){
    transform: scale(0);
}
</style>