<template>
  <div id="main-container">
    <iframe id="video_player"></iframe>
  </div>
</template>

<script setup lang="ts">

  import { onMounted ,ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { getAuthData } from '@/store/utils/auth.ts';
  import { myFetch } from '@/store/utils/myFetch.ts';

  const route = useRoute();
  const api = new myFetch();
  const metaConfigStoreData = metaConfigStore();
  const baseUrl = import.meta.env.VITE_BASE_URL || '';
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
          drm: playbackData.drm, manifest: playbackData.manifest 
        },
        playbackMode: 'dash',
        overlayWatermarkDetails: {},
        engagementInterval: { ...playbackData.engagement },
      },
      embeddablePlayerHtml,
      'video_key',
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

    if(screenerKey.value==null)
    {
      const response=await api.get(`v2/watch/content/projects/${projectKey.value}/videos/${videoKey.value}`,
        {
          Authorization: `JWT ${getAuthData()}`
        }
      );
      screenerKey.value=response.screening_details.screener_key;
    }
    
    dataToEnablePlayback.apiUrl=`v2/watch/stream/${screenerKey.value}/playback`;
    dataToEnablePlayback.embeddablePlayerInitializationUrl=`${baseUrl}${metaConfigStoreData.endpoints['watch.stream.player_function.retrieve']}`
    dataToEnablePlayback.embeddablePlayerTemplateURL=`${baseUrl}${metaConfigStoreData.endpoints['watch.stream.player_component.retrieve']}`;
    await loadScript(dataToEnablePlayback.embeddablePlayerInitializationUrl);
    await fetchPlaybackData();
    
  };

  onMounted(() => {
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