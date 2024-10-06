<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useProductConfigStore } from '@/store/product-config.ts';
      
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
