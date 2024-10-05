<template>
  <Navbar />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="text-lg text-center font-bold py-6 my-3">
      Select the brand whose content you want to see.
    </div>

    <Table @click='handleClick' 
    :columns='brands.length > 0 ? Object.keys(brands[0]).filter(col => col !== "key"):null' 
    :data='brands' 
    :isLoading='isLoading'/>
  
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { metaConfigStore } from '@/store/meta-config.ts'
import Navbar from '@/components/Navbar.vue';
import Table from '@/components/Table.vue';
import { useBrandKey } from '@/store/brand-key';

interface BrandType {
  key: string;
  // keyword: string;
  name: string;
  logo: string | null;
  // header: string;
}

const router = useRouter();
const brands = ref<BrandType[]>([]);
const columns= ref([]);
const isLoading = ref(true);

const handleClick = (payLoad) => {
  event.stopPropagation();
  router.push({ 
    path: '/project', 
    query: { heading: payLoad.name, brandKey: payLoad.key } 
  });
  console.log('Selected brand:', payLoad.key);
};

onMounted(async () => {
  await metaConfigStore().getMetaConfigData();
  isLoading.value = true;
  await useBrandKey().setBrandKey();
  brands.value = useBrandKey().brands;
  isLoading.value = false;
  
});
</script>

<style scoped>

</style>
