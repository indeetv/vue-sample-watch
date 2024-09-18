<template>
  <navbar />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-sm text-blue-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th colspan="5" scope="col" class="px-6 py-3">
            {{ heading }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="isLoading">
          <td colspan="5" class="px-6 py-4 text-center">Loading...</td>
        </tr>

        <tr v-if="!isLoading && projectListing.results.length === 0">
          <td colspan="5" class="px-6 py-4 text-center">No projects available</td>
        </tr>

        <tr 
          v-for="(eachproject, index) in projectListing.results" 
          :key="index" 
          @click="openProject(eachproject)" 
          class="grid grid-cols-2 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          <td class="flex items-center justify-center px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
            {{ eachproject.name }}
          </td>
          <td class="flex items-center justify-center px-6 py-4">
            <img :src="getImageSrc(eachproject.image)" alt="Poster" class="w-18 h-14 object-contain" />
          </td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import navbar from '@/components/navbar.vue';
import { useProjectListing } from '@/store/project-listing.ts';

// Define the types used
interface Project {
  key: string;
  name: string;
  image: string | null;
}

// Define refs and hooks
const heading = ref<string>('');
const isLoading = ref<boolean>(true);
const router = useRouter();
const route = useRoute();
const projectListing = useProjectListing();
const brandKey = ref<string | undefined>();

// Function to navigate to the videos page with project key and brand key
const openProject = (eachproject: Project) => {
  router.push({ 
    path: '/videos', 
    query: { 
      projectKey: eachproject.key,
      brandKey: brandKey.value || '' // Ensure default value if undefined
    }
  });
  console.log("Project result:", projectListing.results.length);
  console.log("Project clicked", eachproject.key);
};

// Function to get image source with fallback
const getImageSrc = (src: string | null) => {
  return src || new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;
};

// Fetch project listing on component mount
onMounted(async () => {
  brandKey.value = route.query.brandKey as string | undefined;
  heading.value = route.query.heading as string | undefined;

  console.log('Project Page: ', brandKey);

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
/* Add any specific styling if needed */
</style>
