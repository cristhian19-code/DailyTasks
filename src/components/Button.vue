<template>
    <button class="">{{text}}</button>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    props: {
        text: {
            type: String,
            required: true
        },
    }
})
</script>

<style>

</style>