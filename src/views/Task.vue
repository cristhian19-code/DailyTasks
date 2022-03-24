<template>
<div class="flex flex-col items-center h-full" :class="isActiveDarkmode ? 'bg-gray-800/95' :'bg-white'">
    <div class="flex w-1/2 mt-5 px-5 justify-center">
        <div v-if="active" class="w-full flex flex-col">
            <input v-model="title" class="border mb-4 rounded-md outline-none px-3 py-2" type="text" placeholder="Nombre de la tarea">
            <div class="flex justify-center gap-5">
                <button @click="active = !active" class="text-md font-semibold px-5 py-2 rounded-md bg-teal-500 transition-all duration-300 hover:shadow-md hover:shadow-teal-400/50 text-white">Cancelar</button>
                <button @click="()=>{
                    newTask({title,done: false,id_activity: $route.params.id})
                    title = ''
                }" class="text-md font-semibold px-5 py-2 rounded-md bg-purple-500 transition-all duration-300 hover:shadow-md hover:shadow-purple-400/50 text-white">Guardar</button>
            </div>
        </div>
        <button  v-else @click="active = !active" class="text-md font-semibold px-5 py-2 rounded-md bg-purple-500 transition-all duration-300 hover:shadow-md hover:shadow-purple-400/50 text-white">Agregar tarea</button>
    </div>
    <div class="mt-5">
        <h1 class="text-4xl text-center text-gray-500 font-medium">{{getTask($route.params.id)?.title}}</h1>
        <ul class="w-fit mt-5">
            <TaskItem v-for="task in getTask($route.params.id)?.tasks" :key="task.title" :title="task.title" :done="task.done"/>
        </ul>
    </div>
    <ModalConfirm />
    <ModalForm title="Editar"/>
</div>
</template>

<script>
import {defineComponent,ref, provide} from 'vue'

import { mapActions, mapGetters, mapState } from 'vuex';

import TaskItem from '../components/Task/TaskItem.vue'
import ModalConfirm from '../components/ui/ModalConfirm.vue';
import ModalForm from '../components/ui/ModalForm.vue';

export default defineComponent({
    data() {
        return {
            active: false,
            title: ''
        }
    },
    setup() {
      provide('isActiveDelete', ref(false));
      provide('isActiveModal', ref(false));
    },
    computed: {
        ...mapGetters(['getTask']),
        ...mapState(['isActiveDarkmode'])
    },
    methods: {
        ...mapActions(['newTask'])
    },
    components: { TaskItem, ModalConfirm, ModalForm },
})
</script>

<style>

</style>