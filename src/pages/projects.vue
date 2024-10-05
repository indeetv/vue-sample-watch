<template>
  <Navbar />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <Table 
      @click="handleClick" 
      :heading="heading" 
      :columns="projectListing.results.length > 0 ? Object.keys(projectListing.results[0]).filter(col => col !== 'key') : null" 
      :data="projectListing.results" 
      :isLoading="isLoading" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Table from '@/components/Table.vue';
import { useProjectListing } from '@/store/project-listing.ts';

const heading = ref<string>('');
const isLoading = ref<boolean>(true);
const router = useRouter();
const route = useRoute();
const projectListing = useProjectListing();
const brandKey = ref<string | undefined>();

// Function to navigate to the videos page with project key and brand key
const handleClick = (payLoad) => {
  event.stopPropagation();

  router.push({ 
    path: '/videos', 
    query: { 
      projectKey: payLoad.key,
      brandKey: brandKey.value || '' 
    }
  });
  console.log("Project result:", projectListing.results.length);
  console.log("Project clicked:", payLoad.key);
};

const getImageSrc = (src: string | null) => {
  return src || new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;
};

onMounted(async () => {
  brandKey.value = route.query.brandKey as string | undefined;
  heading.value = route.query.heading as string || '';

  console.log('Project Page:', brandKey);

  try {
    await projectListing.setProjectListing(brandKey.value);
  } catch (error) {
    console.error('Failed to fetch project listing:', error);
  } finally {
    isLoading.value = false;
    console.log("Projects:", projectListing.results[0]?.key || 'No projects available');
  }
});
</script>

<style scoped>
/* Your styles here */
</style>
