<template>
<div class="main h-full w-full flex">
  <Navbar v-if="$route.fullPath != '/'" class="navbar w-96 transition-all duration-300 overflow-auto" v-show="isActiveSidebar"/>
  <div class="flex flex-col w-full">
    <ControlPage v-if="$route.fullPath != '/'" />
    <router-view class="w-full overflow-auto"></router-view>
    <ModalAddWork/>

  </div>
</div>
</template>
<script>
import {defineComponent} from 'vue'
import { mapState } from 'vuex'
import Navbar from './components/ui/Navbar.vue'
import ControlPage from './components/ui/ControlPage.vue'
import ModalAddWork from './components/ui/ModalAddWork.vue'
export default defineComponent({
    components: { Navbar, ControlPage, ModalAddWork },
    computed: {
        ...mapState(['isActiveSidebar'])
    },
})
</script>
<style>

</style>
