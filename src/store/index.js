import {createStore} from 'vuex'
import router from '../router'
import moment from 'moment'
import { nanoid } from 'nanoid'

import {db,auth} from '../firebase/firebase'
import {addDoc,doc,collection,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'

export default createStore({
    state: {
        isActiveDarkmode: JSON.parse(localStorage.getItem('darkmode') || false) ,
        isActiveSidebar: true,
        loading: false,
        user: null,
        works: [],
        showModalNewWork: false,
        workSelected: [],
        tasks: [],
        msgError: null
    },
    mutations: {
        setDarkmode(state){
            state.isActiveDarkmode = !state.isActiveDarkmode;
            localStorage.setItem('darkmode',state.isActiveDarkmode)
        },
        setSidebar(state){
            state.isActiveSidebar = !state.isActiveSidebar;
        },
        setLoading(state){
            state.loading = !state.loading;
        },
        setShowModalNewWork(state) { 
            state.showModalNewWork = !state.showModalNewWork;
        },
        setUser(state,user){
            state.user = user;
        },
        setWorks(state,works) {
            state.works = works
        },
        setMsgError(state,msg) {
            state.msgError = msg;
        }
    },
    actions: {
        async Works({commit,state}) {
            const resWorks = await getDocs(collection(db, state.user.email));
            let works = [];
            resWorks.forEach((doc) => {
                works.push({id: doc.id,...doc.data()})
            })
            commit('setWorks',works)            
        },
        async newWorkTable({ state,dispatch }, nameWork) {//creacion de  la mesa de trabajo
            const date = moment(Date.now());
            
            try {
                await addDoc(collection(db, state.user.email), {
                    name_work: nameWork,
                    creation_date: date.format('L'),
                    activities: []
                });

                dispatch('Works');     
            } catch (error) {
                console.log(error);
            }
        },
        async newActivity({ state,dispatch }, payload) {// creacion de una actividad en la mesa de trabajo
            const date = moment(Date.now());

            const newActivities ={
                title: payload.name,
                tasks: [],
                id: nanoid(),
                creation_date: date.format('L')
            };
            
            try {
                await updateDoc(doc(db, state.user.email, payload.id), {
                    activities: arrayUnion(newActivities)
                })

                dispatch('Works');     
            } catch (error) {
            }

        },
        async newTask({ state,dispatch}, payload) {// creacion de una tarea en la actividad
            if(state.workSelected.activities.length > 0){
                const {title,done,id_activity} = payload
                console.log(state.workSelected.activities);
                state.workSelected.activities.map((activity) => activity.id === id_activity ? {
                    ...activity,
                    tasks: activity.tasks.push({title,done})
                }: activity)
                
                await updateDoc(doc(db, state.user.email, state.workSelected.id), {
                    activities: state.workSelected.activities
                })

                dispatch('Works');
                
            }else{
                router.push('/work')
            }
        },
        async Logout({commit}){
            await signOut(auth);
            commit('setUser',null);
            router.push({name: 'Home'})
        },
        async loginWithEmailPassword({commit},payload){
            commit('setLoading')

            const {email,password} = payload;
            
            try{
                
                await signInWithEmailAndPassword(auth,email,password)
                router.push({ name: 'Work'})
                
            } catch (err) {
                commit("setMsgError", "Credenciales incorrectas");
                console.log(err);
                setTimeout(() => {
                    commit("setMsgError", null);
                }, 2000);
            }

            commit("setLoading"); 
        },
        async signupWithEmailPassword({commit}, payload){
            commit('setLoading')

            const {email,password,name} = payload;

            try {
                const user = await createUserWithEmailAndPassword(auth,email,password)
                await updateProfile(user.user,{displayName: name})

                await addDoc(collection(db, state.user.email));

                router.push({ name: 'Work' })
            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                commit('setLoading') 
            }, 2000);
        },
        
        Darkmode({commit}){
            commit('setDarkmode')
        },
        toggleButtonSidebar({commit}){
            commit('setSidebar')
        },
        toggleNewWork({ commit }) { 
            commit('setShowModalNewWork')
        },
        extractUser({commit},user){
            commit('setUser',user)
        }
    },
    getters: {
        getActivities: (state) => (id) => {
            if(state.works.length > 0){
                const findWork = state.works.find(work => work.id == id);

                state.workSelected = findWork;
                const activities = findWork.activities.map(activity => ({
                    id: activity.id,
                    title: activity.title,
                    creation_date: activity.creation_date,
                    total: activity.tasks.length,
                    done: activity.tasks.filter(task => task.done).length
                }))
                console.log(state.workSelected);
                return activities
            }
            return []
        },
        getTask: (state) => (id) => { 
            console.log(state.workSelected);
            if (state.workSelected.id) {
                const findActivity = state.workSelected.activities.find(activity => activity.id === id);
                return findActivity
            }
            return []
        }
    }
})