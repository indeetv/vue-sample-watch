<template>
  <div id="main-container">
    <iframe id="video_player"></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted ,ref } from 'vue';
import { useRoute } from 'vue-router';
import { metaConfigStore } from '@/store/meta-config.ts';
import getClientID from '@/store/utils/getClientID'; 
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

const route = useRoute();
const api=new myFetch();
const useMetaConfigData=metaConfigStore();
const watchApiKey = import.meta.env.VITE_API_KEY; 
const projectKey = ref(route.query.projectKey as string | undefined);
const screenerKey = ref(route.query.screenerKey as string | undefined);
const videoKey = ref(route.query.videoKey as string | undefined);

const dataToEnablePlayback = {
  apiUrl: null,
  embeddablePlayerInitializationUrl: 'https://qa8-api.devtest.indee.tv/v2/watch/stream/player/init',
  embeddablePlayerTemplateURL: 'https://qa8-api.devtest.indee.tv/v2/watch/stream/player/view',
  apiKey: watchApiKey,
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
  try {
    const response = await fetch(dataToEnablePlayback.embeddablePlayerTemplateURL, {
      headers: {
        Authorization: `Bearer ${dataToEnablePlayback.apiKey}`,
        Clientid: getClientID(),
        'Content-Type': 'application/html',
      },
    });
    const embeddablePlayerHtml = await response.text();
    if (window?.initializeIndeePlayer) {
      window.initializeIndeePlayer(
        'video_player',
        {
          playbackSourcesData: { drm: playbackData.drm, manifest: playbackData.manifest },
          playbackMode: 'dash',
          overlayWatermarkDetails: {},
          engagementInterval: { ...playbackData.engagement },
        },
        embeddablePlayerHtml,
        'video_key',
        { autoPlay: true }
      );
    }
  } catch (error) {
    console.error('Error fetching or initializing the embeddable player:', error);
  }
};

// Function to fetch playback data
const fetchPlaybackData = async () => {
  try {
    if (!dataToEnablePlayback.apiUrl) {
      throw new Error('Screener key is missing or invalid');
    }
    const response = await fetch(dataToEnablePlayback.apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getAuthData()}`,
        Clientid: getClientID(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stream_protocol: 'dash' }),
    });
    const playbackData = await response.json();
    await getEmbeddablePlayer(playbackData);
  } catch (error) {
    console.error('Error fetching playback data:', error);
  }
};

// Initialization function
const init = async () => {
  try {
    if(screenerKey.value==null)
    {
      const response=await api.get(`content/projects/${projectKey.value}/videos/${videoKey.value}`,
      {
        Authorization: `JWT ${getAuthData()}`,
        Clientid: getClientID()
      });
      screenerKey.value=response.screening_details.screener_key;
      console.log("Video details: ",response.screening_details.screener_key)
    }
    dataToEnablePlayback.apiUrl=`https://qa8-api.devtest.indee.tv/v2/watch/stream/${screenerKey.value}/playback`;

    await loadScript(dataToEnablePlayback.embeddablePlayerInitializationUrl);
    await fetchPlaybackData();
    
  } catch (error) {
    console.error('Error initializing the player:', error);
  }
};

// Lifecycle hook to run initialization on component mount
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
