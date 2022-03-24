<template>
<div :class="`h-full overflow-auto w-full transition-colors duration-500 flex items-start flex-wrap gap-5 justify-center px-4 py-5 ${isActiveDarkmode ? 'bg-gray-800/95' :'bg-white'}`">
    <div class="w-full flex justify-center items-center mt-5">
        <button @click="isActiveModal = !isActiveModal" class="text-white bg-blue-500 px-4 py-2 rounded-md font-medium transition-all hover:shadow-md hover:shadow-blue-500/40 hover:-translate-y-0.5">Nueva actividad</button>
        <transition name="work">
            <div v-show="isActiveModal" class="absolute pb-5 w-96 bg-gray-50 top-52 shadow-lg rounded-md px-3 py-2">
                <div class="flex items-center justify-end">
                    <button class="text-2xl text-gray-500" @click="isActiveModal = !isActiveModal">
                    <i class="ri-close-line"></i>
                    </button>
                </div>
                <div class="mt-2">
                <div>
                    <h1 class="text-center text-2xl">Crear tarea</h1>
                    <input v-model="name_work" class="border-2 w-full mt-5 rounded-md px-3 py-2 outline-none" type="text" placeholder="nombre">
                </div>
                <div class="grid grid-cols-2 mt-8">
                    <button  @click="isActiveModal = !isActiveModal" class="text-sm font-medium text-blue-500">Cancelar</button>
                    <button @click="()=>{
                      isActiveModal = !isActiveModal;

                      newActivity({
                        id: $route.params.id,
                        name: name_work
                      });
                    }
                    " class="text-sm font-medium text-green-500">Crear</button>
                </div>
            </div>
        </div>
        </transition>
    </div>
    <CardWork v-for="activity in getActivities($route.params.id)" :key="activity.title" :id="activity.id" :title="activity.title" :total="activity.total" :done="activity.done" :creation_date="activity.creation_date"/>
</div>
</template>

<script>
import {defineComponent} from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

import CardWork from '../components/CardWork.vue'
import ModalForm from '../components/ui/ModalForm.vue'

export default defineComponent({
    data() {
        return {
            isActiveModal: false,
            name_work: '',
        }
    },
    components: { CardWork, ModalForm },
    methods: {
      ...mapActions(['newActivity']),
    },
    computed: {
        ...mapState(['isActiveDarkmode']),
        ...mapGetters(['getActivities'])
    },
})
</script>

<style>
.work-enter-active {
  animation: showModal .5s;
}
.work-leave-active {
  animation: showModal .5s reverse;
}

@keyframes showModal {
  0% {
    transform: scale(0);
  }
  50%{
    transform: scale(1.2);
  }
  100% {
    transform: translateY(1);
  }
}
</style>