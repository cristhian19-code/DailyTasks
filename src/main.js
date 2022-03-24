import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './index.css'

import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase/firebase'

router.beforeEach((to, from, next) => {
    //saber si una ruta requiere autenticación
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    //obtenermos los datos del usuario actual
    onAuthStateChanged(auth, async (user) => {
        if(user){
            await store.dispatch('extractUser',{
                uid: user.uid,
                email: user.email,
                name: user.displayName
            })
        }else{
            await store.dispatch('extractUser',null)
        }

        if(requiresAuth){
            if(user){
                next()
            }else{
                next({name: 'Home'})
            }
        }else{
            if(user){
                next({name: 'Work',})
            }else{
                next()
            }
        }
    })
})

createApp(App).use(store).use(router).mount('#app')
