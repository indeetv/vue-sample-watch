<template>
  
  <div v-if="isLoading">
    <Loader></Loader>
  </div>
  <div v-else-if="isApiError">
    <error></error>
  </div>
  <div v-else id="main-container">
    <iframe id="video_player"></iframe>
  </div>
  
</template>

<script setup lang="ts">

  import { onMounted , ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useApiErrorData } from '@/store/api-error.ts';
  import Loader from '@/components/Loader.vue';
  import error from '@/pages/error.vue';
  import { getAuthData } from '@/store/utils/auth.ts';
  import { myFetch } from '@/store/utils/myFetch.ts';
  import { useVideoStore } from '@/store/video';

  declare global {
  interface Window {
    initializeIndeePlayer: any
    listenIndeePlayerState: any
    }
  }

  const isLoading = ref(true);
  const route = useRoute();
  const api = new myFetch();
  const metaConfigStoreData = metaConfigStore();
  const videoStore = useVideoStore();
  const isApiError = computed(() => useApiErrorData().isError);
  const baseUrl = import.meta.env.VITE_API_ENDPOINT || '';
  const projectKey = ref(route.query.projectKey as string | undefined);
  const screenerKey = ref(route.query.screenerKey as string | undefined);
  const videoKey = ref(route.query.videoKey as string | undefined);

  const dataToEnablePlayback = {
    apiUrl: "",
    embeddablePlayerInitializationUrl: "",
    embeddablePlayerTemplateURL: ""
  };

  // Function to load external scripts
  const loadScript = (url: string) => {

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.body.appendChild(script);
    });
    
  };

  // Function to fetch and initialize the embeddable player
  const getEmbeddablePlayer = async (playbackData: any) => {

    const response = await api.get(
      dataToEnablePlayback.embeddablePlayerTemplateURL,
      null,
      true
    );

    const embeddablePlayerHtml = await response;

    if (window?.initializeIndeePlayer) {
      window.initializeIndeePlayer(
      'video_player',
      {
        playbackSourcesData: { 
          drm: playbackData.drm,
          manifest: playbackData.manifest,
          defaultSubtitle: videoStore.video?.subtitles[0]?.label || ''
        },
        playbackMode: 'dash',
        overlayWatermarkDetails: videoStore.video?.overlay_watermark_details,
        savePlayerPreferences: true,
        resumeDetails: {
            from_second: videoStore.video?.resume_playback?.from_second || 0,
            duration_in_sec: videoStore.video?.duration_in_sec
          },
        engagementData: 
        { 
          push_interval: playbackData.engagement.push_interval,
          endpointUrl: baseUrl+metaConfigStoreData.endpoints['watch.stream.view_engagement.record'] + '?'
        },
      },
      embeddablePlayerHtml,
      videoStore.video?.key,
      { autoPlay: true }
      );
    }

  };

  // Function to fetch playback data
  const fetchPlaybackData = async () => {
    
    if (!dataToEnablePlayback.apiUrl) {
      throw new Error('Screener key is missing or invalid');
    }

    const response = await api.post(dataToEnablePlayback.apiUrl,
      { stream_protocol: "dash" },
      { Authorization: `JWT ${getAuthData()}` },
      false
    );

    const playbackData = response;
    await getEmbeddablePlayer(playbackData);
    
  };

  // Initialization function
  const init = async () => {
    
    await videoStore.fetchVideoDetails(projectKey.value!, videoKey.value!);

    screenerKey.value=videoStore.video?.screening_details.screener_key || '';
    
    dataToEnablePlayback.apiUrl = metaConfigStoreData.endpoints['watch.stream.session.playback'].replace("<str:screener_key>",String(screenerKey.value));
    dataToEnablePlayback.embeddablePlayerInitializationUrl = `${baseUrl}${metaConfigStoreData.endpoints['watch.stream.player_function.retrieve']}`
    dataToEnablePlayback.embeddablePlayerTemplateURL = `${baseUrl}${metaConfigStoreData.endpoints['watch.stream.player_component.retrieve']}`;
    
    await loadScript(dataToEnablePlayback.embeddablePlayerInitializationUrl);
    isLoading.value = false;
    await fetchPlaybackData();
    
  };

  onMounted(async () => {

    useApiErrorData().resetApiErrorMsg();
    await metaConfigStoreData.getMetaConfigData();

    init();

  });

</script>

<style scoped>

  #main-container {
    padding: 0;
    margin: 0;
    height: 100svh;
    width: 100svw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
  }

  #video_player {
    height: 90svh;
    width: 90svw;
    border: none;
  }

</style>