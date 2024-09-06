<script setup lang="ts">
  import { createPinia } from 'pinia';
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { useProductConfigStore } from './store/product-config';
      
  onMounted(async()=>{
    await useProductConfigStore().getProductConfig();
  })
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
