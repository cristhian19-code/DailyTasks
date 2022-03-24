<template>
<transition name="modal">
    <div v-show="isActiveModal" class="absolute pb-5 w-96 bg-gray-50 top-52 shadow-lg rounded-md px-3 py-2">
        <div class="flex items-center justify-end">
            <button class="text-2xl text-gray-500" @click="isActiveModal = !isActiveModal">
              <i class="ri-close-line"></i>
            </button>
        </div>
        <div class="mt-2">
          <div>
            <h1 class="text-center text-2xl">{{title}}</h1>
            <input class="border-2 w-full mt-5 rounded-md h-9 p-2 outline-none" type="text" placeholder="title">
          </div>
          <div class="grid grid-cols-2 mt-8">
            <button  @click="isActiveModal = !isActiveModal" class="text-sm font-medium text-blue-500">Cancelar</button>
            <button class="text-sm font-medium text-green-500">Editar</button>
          </div>
        </div>
    </div>
</transition>
</template>

<script>
import {defineComponent, inject} from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String
    }
  },
  setup() {
      const isActiveModal = inject('isActiveModal')

      return {
          isActiveModal
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