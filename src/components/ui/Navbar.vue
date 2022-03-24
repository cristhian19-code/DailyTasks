<template>
<nav 
  class="navbar px-5 py-10 transition-colors duration-500 border-r-2 relative flex flex-col justify-between items-center overflow-auto"
  :class="isActiveDarkmode ? 'bg-gray-800/95 border-gray-700' :'bg-white border-gray-200'"
>
  <router-link
    to="/work" 
    class="text-center text-3xl hover:underline"
    :class="isActiveDarkmode ? 'text-gray-300' : 'text-gray-500'"
  >
    DailyTask
  </router-link>

  <ul class="w-full">
    <li v-for="item in works" v-bind:key="item">
      <button 
        @click="()=> $router.push('/work/' + item.id)"
        class="w-full py-3 transition-colors duration-200 rounded-sm font-normal shadow-md flex items-center justify-center text-sm"
        :class="isActiveDarkmode ? 'bg-gray-800/70 text-gray-300' : 'bg-white text-gray-500'"
      >
       {{item.name_work}} <i class="ri-layout-2-fill text-xl ml-2"></i>
      </button>
    </li>
  </ul>

  <div class="flex items-center justify-center w-full gap-2">
    <button @click="toggleNewWork()" class="text-sm font-bold bg-blue-500 text-white w-full py-3 flex items-center justify-center rounded-md shadow-md shadow-blue-500/40">
      New work <i class="ri-add-line"></i>
    </button>
    <button @click="Logout()" class="text-sm font-bold bg-red-500 text-white w-full py-3 flex items-center justify-center rounded-md shadow-md shadow-red-500/40">
      Logout <i class="ri-logout-box-line ml-2"></i>
    </button>
  </div>
</nav>
</template>

<script>
import {defineComponent} from 'vue'
import { mapActions, mapState } from 'vuex'
import ModalAddWork from './ModalAddWork.vue';
export default defineComponent({
    computed: {
        ...mapState(["isActiveDarkmode", "works","showModalNewWork"]),
    },
    methods: {
        ...mapActions(["Logout", "Works","toggleNewWork"])
    },
    created() {
        this.Works();
    },
    components: { ModalAddWork }
})
</script>

<style>
.navbar{
  width: 500px;
}
</style>