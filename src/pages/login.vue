<template>
  <Login :authType="authType" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useProductConfigStore } from '@/store/product-config';
  import Login from '@/components/Login.vue';

  const productConfigStore =useProductConfigStore();

  const authType = computed(() => productConfigStore.auth_type);
  console.log("------------------------",authType.value)

</script>

<style scoped>

</style>
