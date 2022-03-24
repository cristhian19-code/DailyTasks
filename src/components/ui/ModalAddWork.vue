<template>
<transition name="work">
    <div v-show="showModalNewWork" class="top-0 left-0 absolute h-full w-full bg-gray-900/70 flex items-center justify-center p-5">
        <form class="w-96 bg-white rounded-lg shadow-lg py-4 px-5 relative">
            <button @click.prevent="toggleNewWork()" class="absolute top-5 right-5">
                <i class="ri-close-line text-gray-500 text-2xl"></i>
            </button>


            <h1 class="text-center text-2xl text-gray-500 mt-5">Crear mesa de trabajo</h1>
            <div class="mt-5">
                <label class="text-sm text-gray-600" for="namework">Nombre de la mesa de trabajo</label>
                <input v-model="nameWork" class="border p-3 w-full rounded-md outline-none mt-1" type="text" id="namework" placeholder="mesa de trabajo">
            </div>
            <div class="flex justify-center gap-7 mt-5 mb-4">
                <button  @click="toggleNewWork()" class="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:shadow-md hover:shadow-blue-400/40 hover:-translate-y-0.5 transition-all font-medium">Cancelar</button>
                <button @click.prevent="newWorkTable(nameWork)" class="text-sm text-white bg-green-500 px-4 py-2 rounded-md hover:shadow-md hover:shadow-green-400/40 hover:-translate-y-0.5 transition-all font-medium">Crear</button>
            </div>
        </form>
    </div>
</transition>
</template>

<script>
import {defineComponent} from 'vue'
import { mapActions, mapState } from 'vuex'
export default defineComponent({
    data() {
        return {
            nameWork: '',
        }
    },
    computed: {
        ...mapState(['showModalNewWork'])
    },
    methods: {
        ...mapActions(['toggleNewWork','newWorkTable'])
    }
})
</script>

<style>
.work-enter-active, .work-leave-active {
  transition: opacity .9s;
}
.work-enter, .work-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>