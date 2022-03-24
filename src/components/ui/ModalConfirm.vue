<template>
<transition name="modal">
    <div v-show="isActiveDelete" class="absolute bg-gray-50 pb-5 top-52 shadow-lg w-72 rounded-md px-5 py-2">
        <div class="flex items-center justify-end">
            <button class="text-2xl text-gray-500" @click="isActiveDelete = !isActiveDelete">
                <i class="ri-close-line"></i>
            </button>
        </div>
        <div class="mt-2 text-center">
            <i class="ri-alert-line text-6xl text-red-600"></i>
            <h1 class="text-center text-md text-gray-500 font-semibold mb-2">Esta seguro de eliminar ?</h1>
            <div class="grid grid-cols-2 mt-3">
                <button @click="isActiveDelete = !isActiveDelete" class="text-sm font-medium text-blue-500">Cancelar</button>
                <button class="text-sm font-medium text-red-500">Eliminar</button>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {defineComponent, inject} from 'vue'
export default defineComponent({
    setup() {
        const isActiveDelete = inject('isActiveDelete')

        return {
            isActiveDelete
        }
    }  
})
</script>

<style>
.modal-enter-active {
  animation: showModal .5s;
}
.modal-leave-active {
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