<template>
<div class="transition-colors duration-500 delay-100 w-80 shadow-lg rounded-md px-7 py-5" :class="darkmode ? 'bg-gray-800/70' : 'bg-white'">
        <h1 class="text-3xl mb-2 font-medium" :class="!darkmode ? 'text-gray-500' : 'text-white'">{{title}}</h1>
        <p class="text-xs text-gray-400">Fecha creacion: {{creation_date}}</p>
        <p class="text-xs mt-2 text-blue-400"><span class="font-bold">{{total}}</span> Tareas en total</p>
        <p class="text-xs mt-2 text-green-400"><span class="font-bold">{{done}}</span> Tareas Completadas</p>
        <p class="text-xs mt-2 text-red-400"><span class="font-bold">{{total-done}}</span> Tareas Pendiente</p>
        <router-link
            :to="`/task/${id}`"
            class="transition-colors duration-500 py-2 mt-5 text-sm w-full rounded-sm font-bold flex items-center justify-center gap-2" 
            :class="!darkmode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-500'">
            Ver tareas <i class="ri-stack-line"></i>
        </router-link>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
    props: {
        done: {
            type: Number,
        },
        total: {
            type: Number,
        },
        title: {
            type: String
        },
        creation_date: {
            type: String
        },
        id: {
            type: String
        }
    },
    computed: {
        ...mapState(['darkmode'])
    }
})
</script>

<style>

</style>