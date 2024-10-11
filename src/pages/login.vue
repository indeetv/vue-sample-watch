<template>

  <Login 
    :authType='authType'
    @submit='initiateLogin'
  />

</template>

<script setup lang="ts">

  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { saveAuthData } from '@/store/utils/auth';
  import { useProductConfigStore } from '@/store/product-config';
  import { myFetch } from '@/store/utils/myFetch';
  import Login from '@/components/Login.vue';

  const router = useRouter();
  const productConfigStore = useProductConfigStore();
  const authType = computed(() => productConfigStore.auth_type);
  const api = new myFetch();

  const initiateLogin = async (data: { email?: string; authKey: string }) => {

    const requestBody =
      authType.value === 'PWD'
        ? {
            type : 'password',
            credentials : {
              username : data.email,
              password : data.authKey,
            },
            persist : false,
          }
        : authType.value === 'PIN'
        ? {
            type : 'pin',
            credentials : {
              pin : data.authKey,
            },
            persist : false,
          }
        : undefined;

    const response = await api.post(
      'v2/watch/auth/login',
      requestBody
    );

    saveAuthData(response.token)  
    
    router.push('/brands')
      
  };

</script>

<style scoped>
/* Your styles here */
</style>
