import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';
import { metaConfigStore } from '@/store/meta-config.ts';
import { VideoEntity } from './types/video';

export const useVideoStore = defineStore('video', {
  state: () => ({
  }),
  actions: {
    async fetchVideoDetails(projectKey: string, videoKey: string) {

      const metaConfigStoreData = metaConfigStore();
      const api = new myFetch();
      const authKey = getAuthData();

      let videoRetrieveUrl = metaConfigStoreData.endpoints['watch.content.video.retrieve']
        .replace('<str:project_key>', String(projectKey))
        .replace('<str:video_key>', String(videoKey));

      try 
      {
        const response = await api.get(videoRetrieveUrl, {
          Authorization: `JWT ${authKey}`
        });

        return response as VideoEntity;
        
      } catch (err: any) {
        console.error("Error fetching video:", err);
      }
    }
  }
}); 