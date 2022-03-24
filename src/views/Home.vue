<template>
<div class="h-full flex flex-col items-center justify-center bg-indigo-500/80">
  <div class=" w-96 bg-white rounded-md py-10">
    <h1 class="text-4xl text-center my-7 text-gray-500">
      {{login ? 'Iniciar Sesion' : 'Registrate'}}
    </h1>
    <form 
      @submit.prevent="
        login ? loginWithEmailPassword(session) 
              : signupWithEmailPassword(session)
      "
      class="w-full flex flex-col items-center px-8"
    > 
      <div v-if="msgError" class="w-full border-l-4 border-red-500 text-md h-9 px-2 flex items-center font-medium text-red-500 mb-2">
        {{msgError}}
      </div>

      <template v-if="!login" class="transition-all duration-150">
        <input v-model="session.name" type="text" class="outline-none w-full h-12 border-2 rounded-md my-2 p-2 focus:border-indigo-500/60 text-gray-600" required placeholder="Nombre">
      </template>

      <input v-model="session.email" type="email" class="outline-none w-full h-12 border-2 rounded-md my-2 p-2 focus:border-indigo-500/60 text-gray-600" required placeholder="Email" autocomplete="off">
      <div class="relative w-full flex items-center">
        <input autocomplete="off" v-model="session.password" :type="!passvisible ? 'password' : 'text'" class="outline-none w-full h-12 border-2 rounded-md my-2  p-2 focus:border-indigo-500/60 pr-9 text-gray-600" placeholder="Password">
        <span class="absolute right-3 cursor-pointer" @click="passvisible = !passvisible">
          <i :class="passvisible ? 'ri-eye-line':'ri-eye-off-line'"></i>
        </span>
      </div>
            
      <button
        :disabled="loading"
        class="bg-indigo-600 hover:bg-indigo-600/80 mt-5 px-10 py-2 rounded-md text-white shadow-md shadow-indigo-500/70 flex items-center justify-center">
        <span v-if="!loading">{{login ? 'Ingresar' : 'Registrate'}}</span>
        <i v-else class="ri-loader-5-line text-xl font-bold animate-spin m-0 ml-2"></i>
      </button>

      <span class="text-sm mt-4">
        {{
          login ? 'Aun no estas registrado?' : 'Ya tienes una cuenta?'
        }} 
        <a @click="visible()" href="#" class="text-blue-600 underline hover:text-blue-600/70">click aqui</a>
      </span>
    </form>
  </div>
</div>
</template>

<script>
import {defineComponent} from 'vue'
import { mapActions, mapState } from 'vuex';


export default defineComponent({
  data() {
    return {
      login : true,
      session: {
        email: '',
        password: ''
      },
      passvisible: false
    }
  },
  computed: {
    ...mapState(['loading','msgError'])
  },
  methods: {
    visible(){
      ///change view form
      this.login = !this.login;

      //add or remove properties
      if(!this.login){
        this.session = {
          ...this.session,
          name: '',
        }
      }else{
        delete this.session.name;
      }
    },
    ...mapActions(['loginWithEmailPassword','signupWithEmailPassword'])
  },
})
</script>

<style>

</style>