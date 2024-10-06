<template>

  <Navbar />
  <Table  
    :heading='heading' 
    :columns='columnsData' 
    :data='allVideos' 
    :isLoading='isLoading'
    @click='playVideo'
  />

</template>

<script setup lang="ts">

  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'; 
  import { getAuthData } from '@/store/utils/auth'; 
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useVideoListing } from '@/store/video-listing.ts';
  import getClientID from '@/store/utils/getClientID';
  import Navbar from '@/components/Navbar.vue';
  import Table from '@/components/Table.vue';

  const columnsData=ref([]);
  const allVideos = ref<Video[]>([]);
  const isLoading = ref(true);
  const projectKey = ref<string | undefined>(''); 
  const route = useRoute(); 
  const router = useRouter(); 
  const metaConfigStoreData=metaConfigStore();
  const videoListing=useVideoListing();

  interface Video {
    name : string;
    max_views : number;
    views_consumed : number;
    start_date : string;
    expiry_date : string;
    poster : string;
    video_key : string; 
    screener_key : string;
  }

  const getImageSrc = (src: string | null) => {
    return src || new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;
  };

  onMounted(async () => {

    projectKey.value = route.query.projectKey as string | undefined;

    await videoListing.setVideoListing(projectKey.value);
    columnsData.value = videoListing.results.length > 0 ? Object.keys(videoListing.results[0]) : [];
    allVideos.value = videoListing.results || [];

    isLoading.value = false;      

  });

  const playVideo = (video: Video) => {

    router.push({
      path : '/viewing_room',
      query : {
        projectKey : projectKey.value,
        videoKey : video.video_key,
        screenerKey : video.screener_key || null
      }
    }); 

  }

</script>

<style scoped>
/* Your styles here */
</style>
