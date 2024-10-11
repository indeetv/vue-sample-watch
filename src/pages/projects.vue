<template>

  <Navbar />
  <Table  
    :heading='heading' 
    :columns='columnsData' 
    :data='projectsData' 
    :isLoading='isLoading'
    @click='handleClick'
  />

</template>

<script setup lang="ts">

  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useProjectListing } from '@/store/project-listing.ts';
  import Navbar from '@/components/Navbar.vue';
  import Table from '@/components/Table.vue';

  interface Project {
    key : string;
    name : string;
    poster : string;
  }

  const heading = ref<string>('');
  const columnsData = ref([]);
  const projectsData = ref<Project[]>([]);
  const isLoading = ref<boolean>(true);
  const brandKey = ref<string | undefined>();
  const route = useRoute();
  const router = useRouter();
  const metaConfigStoreData=metaConfigStore();
  const projectListing = useProjectListing();

  const handleClick = (payLoad : any) => {

    event.stopPropagation();
    router.push({ 
      path : '/videos', 
      query : { 
        heading : payLoad.name,
        projectKey : payLoad.key,
        brandKey : brandKey.value || '' 
      }
    });

  };

  onMounted(async () => {

    await metaConfigStoreData.getMetaConfigData();

    heading.value = route.query.heading as string || '';
    brandKey.value = route.query.brandKey as string | undefined;

    await projectListing.setProjectListing(brandKey.value);
    
    columnsData.value = projectListing.results.length > 0 ? Object.keys(projectListing.results[0]) : []
    projectsData.value = projectListing.results;

    isLoading.value = false;

  });

</script>

<style scoped>
/* Your styles here */
</style>
