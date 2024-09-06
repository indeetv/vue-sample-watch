<template>
  <Login :authType="authType" />
</template>

<script setup lang="ts">
import { onMounted,ref} from 'vue';
import Login from '@/components/Login.vue';
import { myFetch } from '@/store/utils/myFetch.ts';
import getClientID from '@/store/utils/getClientID.ts'

const api = new myFetch();
const authType=ref('')

const fetchProductConfig = async () => {
    const token = import.meta.env.VITE_API_KEY; 
    
    const data=await api.get(`meta/product-config?device=browser`, 
    { 
      Authorization: `Bearer ${token}`,
      'ClientID': getClientID()
    })
    
    authType.value=data.auth_type;

    // console.log("----------------------", data); 

};

onMounted(() => {
  fetchProductConfig();
});
</script>

<style scoped>

</style>
