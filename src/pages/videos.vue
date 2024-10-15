<template>
  <div v-if="isLoading">
    <Loader></Loader>
  </div>
  <div v-else>
    <Navbar />
    <Table  
      :heading="`Project : ${projectKey}`" 
      :columns='columnsData' 
      :data='videosData' 
      :isLoading='isLoading'
      @click='playVideo'
    />
    <div 
      v-if="paginatedCallOngoing">
      <ContentLoader></ContentLoader>
    </div>
    <div 
      v-if="videoListing.next && !paginatedCallOngoing" 
      class="text-center">
      <button
        class="text-blue-700 text-center no-underline p-5 cursor-pointer"
        @click="handleProjectPagination"
      >
        Load More Videos...
      </button>
    </div>
  </div>
  
</template>

<script setup lang="ts">

  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router'; 
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useVideoListing } from '@/store/video-listing.ts';
  import Loader from '@/components/Loader.vue';
  import ContentLoader from '@/components/ContentLoader.vue';
  import Navbar from '@/components/Navbar.vue';
  import Table from '@/components/Table.vue';

  const heading = ref('');
  const columnsData=ref([]);
  const isLoading = ref(true);
  const paginatedCallOngoing = ref<boolean>(false);
  const projectKey = ref<string | undefined>(''); 
  const route = useRoute(); 
  const router = useRouter(); 
  const metaConfigStoreData=metaConfigStore();
  const videoListing = useVideoListing();

  const videosData = computed(() => videoListing.results);

  const handleProjectPagination = async () => {

    paginatedCallOngoing.value = true;
    await videoListing.fetchProjectListing(videoListing.next, null, true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    paginatedCallOngoing.value = false;

    };

  onMounted(async () => {

    await videoListing.resetVideoStore();

    await metaConfigStoreData.getMetaConfigData();

    heading.value = route.query.heading as string;
    projectKey.value = route.query.projectKey as string;

    await videoListing.fetchVideoListing(metaConfigStoreData.endpoints['watch.content.videos.list'], projectKey.value);
    
    columnsData.value = videoListing.results.length > 0 ? Object.keys(videoListing.results[0]) : [];

    isLoading.value = false;      

  });

  const playVideo = (video: any) => {

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
