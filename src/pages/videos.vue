<template>
  <navbar />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-blue-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Duration in Sec</th>
          <th scope="col" class="px-6 py-3">Expires On</th>
          <th scope="col" class="px-6 py-3">Poster</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="5" class="px-6 py-4 text-center">Loading...</td>
        </tr>
        <tr v-else-if="allVideos.length === 0">
          <td colspan="5" class="px-6 py-4 text-center">No videos available.</td>
        </tr>
        <tr 
          v-for="(video, index) in allVideos" 
          :key="index" 
          @click="playVideo(video)" 
          class="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ video.name }}</td>
          <td class="px-6 py-4">{{ video.description }}</td>
          <td class="px-6 py-4">{{ video.duration_in_sec }}</td>
          <td class="px-6 py-4">{{ video.expiresOn }}</td>
          <td class="flex justify-center px-6 py-4">
            <img :src="getImageSrc(video.poster)" :alt="`Poster for ${video.name}`" class="w-18 h-14 object-contain"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Import useRouter and useRoute
import navbar from '@/components/navbar.vue';
import { myFetch } from '@/store/utils/myFetch';
import getClientID from '@/store/utils/getClientID'; // Ensure correct import path
import { getAuthData } from '@/store/utils/auth'; // Ensure correct import path

const router = useRouter(); // Use useRouter to get the router instance
const route = useRoute(); // Use useRoute to get route details
const allVideos = ref<Video[]>([]);
const token = getAuthData();
const isLoading = ref(true);
const projectKey = ref<string | undefined>(''); // Initialize projectKey

interface Video {
  name: string;
  description: string;
  duration_in_sec: number;
  expiresOn: string;
  poster: string;
  key?: string; // Ensure video object has key property if used
}

const getImageSrc = (src: string | null) => {
  return src || new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;
};

onMounted(async () => {
  try {
    const api = new myFetch();
    projectKey.value = route.query.projectKey as string | undefined;
    if (projectKey.value) { 
      const response = await api.get(`content/projects/${projectKey.value}/videos`, {
        Authorization: `JWT ${token}`,
        'ClientID': getClientID()
      });
      allVideos.value = response.results || [];
    } else {
      console.error("Project key is missing.");
    }
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  } finally {
    isLoading.value = false;
  }
});

const playVideo = (video: Video) => {
  router.push({
    path: '/viewing_room',
    query: {
      projectKey: projectKey.value,
      videoKey: video.key,
      screenerKey: video.screening_details?.screener_key || null
    }
  }); 
  console.log("Video played", video);
}
</script>

<style scoped>

</style>
