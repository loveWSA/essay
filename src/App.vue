<script setup>
import { ref } from 'vue'
const count = ref(1)
const add = () => {
  count.value++
}
const sub = () => {
  count.value--
}
</script>

<template>
  <div>
    {{ count }}
    <button @click="add">+</button>
    <button @click="sub">-</button>
  </div>
</template>
