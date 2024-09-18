<script setup lang="ts">
  import { createPinia } from 'pinia';
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config'
  import { useProductConfigStore } from '@/store/product-config';
      
  onMounted(async()=>{
    await metaConfigStore().getMetaConfigData();
    await useProductConfigStore().getProductConfig();
  })
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
