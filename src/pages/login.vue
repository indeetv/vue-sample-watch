<template>

  <Login 
    :logo_image='logo_image'
    :authType='authType'
    @submit='initiateLogin'
  />

</template>

<script setup lang="ts">

  import { computed , onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { saveAuthData } from '@/store/utils/auth';
  import { metaConfigStore } from '@/store/meta-config'
  import { useProductConfigStore } from '@/store/product-config';
  import { myFetch } from '@/store/utils/myFetch';
  import Login from '@/components/Login.vue';

  const router = useRouter();
  const productConfigStore = useProductConfigStore();
  const logo_image = computed(() => productConfigStore.logo_image)
  const authType = computed(() => productConfigStore.auth_type);
  const api = new myFetch();

  onMounted(async ()=>{
    await metaConfigStore().getMetaConfigData();
    await productConfigStore.getProductConfig();
  })

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
