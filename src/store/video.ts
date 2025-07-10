import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';
import { metaConfigStore } from '@/store/meta-config.ts';

interface ScreeningDetails {
  screener_key: string
  expired: boolean
  max_views: number
  views_consumed: number
  start_date: number
  expiry_date: number
  offline: boolean
}

interface AuthDetails {
  mode: string
  ident: {
    country_code: number
    phone: number
  }
}

interface OverlayDetails {
  text: string
  opacity: number
  position: string
  interval_in_seconds: number
  image_link: string
}

interface ResumeDetails {
  from_second?: number
}

interface Video {
  key: string
  name: string
  poster: string
  duration_in_sec: number
  cast_and_crew: any[]
  description: string
  subtitles: any[]
  is_cmaf_enabled: boolean
  season: any
  episode: any
  original_air_date: any
  screening_details: ScreeningDetails
  auth_details: AuthDetails
  overlay_watermark_details: OverlayDetails
  resume_playback: ResumeDetails
}

export const useVideoStore = defineStore('video', {
  state: () => ({
    video: null as Video | null
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
        const response: Video = await api.get(videoRetrieveUrl, {
          Authorization: `JWT ${authKey}`
        });

        this.video = response;
        
      } catch (err: any) {
        console.error("Error fetching video:", err);
      }
    }
  }
}); 