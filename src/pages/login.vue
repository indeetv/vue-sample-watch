<template>
  <Login :authType="authType" @submit="initiateLogin" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductConfigStore } from '@/store/product-config';
import { myFetch } from '@/store/utils/myFetch';
import { saveAuthData, getAuthData } from '@/store/utils/auth';
import Login from '@/components/Login.vue';
import getClientID from '@/store/utils/getClientID';
import router from '@/router/index.js';
import { useLoggedInStore } from '@/store/loggedIn.ts'


// Initialize instances
const api = new myFetch();
const token = import.meta.env.VITE_API_KEY;
const productConfigStore = useProductConfigStore();

// Compute authentication type from product configuration store
const authType = computed(() => productConfigStore.auth_type);

// Function to handle login
const initiateLogin = async (data: { email?: string; authKey: string }) => {
  console.log("Token:", token);

  // Construct request body based on auth type
  const requestBody =
    authType.value === 'PWD'
      ? {
          type: 'password',
          credentials: {
            username: data.email,
            password: data.authKey,
          },
          persist: false,
        }
      : authType.value === 'PIN'
      ? {
          type: 'pin',
          credentials: {
            pin: data.authKey,
          },
          persist: false,
        }
      : undefined;

  console.log(requestBody);

    const response = await api.post(
      'auth/login',
      requestBody,
      {
        Authorization: `Bearer ${token}`,
        ClientID: getClientID()
      }
    );

    saveAuthData(response.token)  
  
    router.push('/brands')
    
  
};
</script>

<style scoped>
/* Your component styles here */
</style>
