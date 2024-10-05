<template>
  <Navbar />
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
          v-for="(video, index) in videoListing.results" 
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
  <Table 
      @click="handleClick" 
      :heading="heading" 
      :columns="allVideos.length > 0 ? Object.keys(allVideos[0]).filter(col => col !== 'key') : null" 
      :data="allVideos" 
      :isLoading="isLoading" 
    />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; 
import Navbar from '@/components/Navbar.vue';
import Table from '@/components/Table.vue';
import { myFetch } from '@/store/utils/myFetch';
import getClientID from '@/store/utils/getClientID'; 
import { getAuthData } from '@/store/utils/auth'; 
import { metaConfigStore } from '@/store/meta-config.ts';
import { useVideoListing } from '@/store/video-listing.ts';


const router = useRouter(); 
const route = useRoute(); 
const allVideos = ref<Video[]>([]);
const token = getAuthData();
const isLoading = ref(true);
const projectKey = ref<string | undefined>(''); 
const metaConfigStoreData=metaConfigStore();
const videoListing=useVideoListing();

interface Video {
  name: string;
  max_views: number;
  views_consumed: number;
  start_date: string;
  expiry_date: string;
  poster: string;
  video_key: string; 
  screener_key: string;
}

const getImageSrc = (src: string | null) => {
  return src || new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;
};

onMounted(async () => {
  projectKey.value = route.query.projectKey as string | undefined;
  await videoListing.setVideoListing(projectKey.value);

  allVideos.value = videoListing.results || [];
  isLoading.value = false;
  console.log(allVideos.value)
    
});

const playVideo = (video: Video) => {
  console.log("***********",video)
  router.push({
    path: '/viewing_room',
    query: {
      projectKey: projectKey.value,
      videoKey: video.video_key,
      screenerKey: video.screener_key || null
    }
  }); 
  console.log("Video played", video);
}
</script>

<style scoped>

</style>
