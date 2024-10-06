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
  const projectListing = useProjectListing();

  const handleClick = (payLoad) => {

    event.stopPropagation();
    router.push({ 
      path : '/videos', 
      query : { 
        projectKey : payLoad.key,
        brandKey : brandKey.value || '' 
      }
    });

  };

  const getImageSrc = (src: string | null) => {
    return src || new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;
  };

  onMounted(async () => {

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
