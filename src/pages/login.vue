<template>
  
  <div v-if="isLoading">
    <Loader></Loader>
  </div>
  <div v-else>
    <Login 
      :logo_image='logo_image'
      :authType='authType'
      @submit='initiateLogin'
    />
  </div>

</template>

<script setup lang="ts">

  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { saveAuthData } from '@/store/utils/auth';
  import { metaConfigStore } from '@/store/meta-config'
  import { useProductConfigStore } from '@/store/product-config';
  import { myFetch } from '@/store/utils/myFetch';
  import Loader from '@/components/Loader.vue';
  import Login from '@/components/Login.vue';

  const isLoading = ref(true);
  const router = useRouter();
  const productConfigStore = useProductConfigStore();
  const logo_image = computed(() => productConfigStore.logo_image)
  const authType = computed(() => productConfigStore.auth_type);
  const api = new myFetch();

  onMounted(async ()=>{

    await metaConfigStore().getMetaConfigData();
    await productConfigStore.getProductConfig();

    isLoading.value = false;
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

    const response: any = await api.post(
      'v2/watch/auth/login',
      requestBody
    );

    saveAuthData(response.token);  
    
    router.push('/brands')
      
  };

</script>

<style scoped>
/* Your styles here */
</style>
