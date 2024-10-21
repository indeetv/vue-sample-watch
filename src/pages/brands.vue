<template>
  <div v-if="isLoading">
    <Loader></Loader>
  </div>
  <div v-else-if="isApiError">
    <error></error>
  </div>
  <div v-else>
    <Navbar />
    <ContentTable
      :heading='heading'
      :columns='columnsData' 
      :data='brandsData' 
      :isLoading='isLoading'
      @clicked='handleClick'
    />
    <div 
      v-if="paginatedCallOngoing">
      <ContentLoader></ContentLoader>
    </div>
    <div 
      v-if="brandListing.next && !paginatedCallOngoing" 
      class="text-center">
      <button
        class="text-blue-700 text-center no-underline p-5 cursor-pointer"
        @click="handleProjectPagination"
      >
        Load More Brands...
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">

  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useApiErrorData } from '@/store/api-error.ts';
  import { useBrandData } from '@/store/brand-listing';
  import Loader from '@/components/Loader.vue';
  import error from '@/pages/error.vue';
  import ContentLoader from '@/components/ContentLoader.vue';
  import Navbar from '@/components/Navbar.vue';
  import ContentTable from '@/components/ContentTable.vue';

  const heading = ref('');
  const columnsData = ref<string[]>([]);
  const isLoading = ref(true);
  const paginatedCallOngoing = ref<boolean>(false);
  const router = useRouter();
  const metaConfigStoreData = metaConfigStore();
  const isApiError = computed(() => useApiErrorData().isError);
  const brandListing = useBrandData();
  
  const brandsData = computed(() => brandListing.results);

  const handleClick = (payLoad : any) => {

    event.stopPropagation();
    router.push({ 
      path : '/project', 
      query : { heading : payLoad.name, brandKey : payLoad.key } 
    });

  };

  const handleProjectPagination = async () => {

    paginatedCallOngoing.value = true;
    await brandListing.fetchBrandListing(brandListing.next, undefined, true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    paginatedCallOngoing.value = false;

  };

  onMounted(async () => {

    useApiErrorData().resetApiErrorMsg();

    await brandListing.resetBrandStore();    

    await metaConfigStoreData.getMetaConfigData();
    
    isLoading.value = true;
    await brandListing.fetchBrandListing(metaConfigStoreData.endpoints['watch.content.brand.list']);

    heading.value = "Select the brand whose content you want to see.";
    columnsData.value = brandListing.results.length > 0 ? Object.keys(brandListing.results[0]) : [];
    
    isLoading.value = false;
    
  });

</script>

<style scoped>
/* Your styles here */
</style>
