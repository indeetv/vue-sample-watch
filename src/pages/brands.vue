<template>

  <Navbar />
  <Table
    :heading='heading'
    :columns='columnsData' 
    :data='brandsData' 
    :isLoading='isLoading'
    @click='handleClick' 
  />

</template>

<script setup lang="ts">

  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useBrandData } from '@/store/brand-listing';
  import Navbar from '@/components/Navbar.vue';
  import Table from '@/components/Table.vue';

  interface BrandType {
    key : string;
    name : string;
    logo : string | null;
  }

  const heading = ref('');
  const columnsData = ref([]);
  const brandsData = ref<BrandType[]>([]);
  const isLoading = ref(true);
  const router = useRouter();
  const brandListing = useBrandData();
  

  const handleClick = (payLoad) => {

    event.stopPropagation();
    router.push({ 
      path : '/project', 
      query : { heading : payLoad.name, brandKey : payLoad.key } 
    });

  };

  onMounted(async () => {

    await metaConfigStore().getMetaConfigData();
    isLoading.value = true;
    await brandListing.setBrandKey();
    
    heading.value = "Select the brand whose content you want to see."
    columnsData.value = brandListing.brands.length > 0 ? Object.keys(brandListing.brands[0]) : []
    brandsData.value = brandListing.brands;
    
    isLoading.value = false;
    
  });

</script>

<style scoped>
/* Your styles here */
</style>
