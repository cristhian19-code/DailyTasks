<template>
<li class="w-full bg-white py-3 px-5 shadow-md text-gray-500 flex items-center justify-between gap-5 rounded-md mb-2">
    <p :class="`font-semibold text-sm ${done ? 'line-through' : ''}`">{{title}}</p>
    <div class="flex gap-2 ml-10">
        <button @click="isActiveDelete = !isActiveDelete" class="text-white bg-red-500/90 shadow-md hover:shadow-red-400/60 h-7 w-7 rounded-md transition-all hover:-translate-y-0.5">
            <i class="ri-delete-bin-line"></i>
        </button>
        <button @click="isActiveModal = !isActiveModal" class="text-white bg-green-500/90 shadow-md hover:shadow-green-400/60 h-7 w-7 rounded-md transition-all hover:-translate-y-0.5">
            <i class="ri-pencil-line"></i>
        </button>
    </div>
</li>
</template>

<script>
import {defineComponent, inject} from 'vue'
export default defineComponent({
    props: {
        title: {
            type: String
        },
        done: {
            type: Boolean
        }
    },
    setup() {
        const isActiveDelete = inject('isActiveDelete')
        const isActiveModal = inject('isActiveModal')

        return {
            isActiveDelete,
            isActiveModal
        }
    }
})
</script>

<style>

</style>