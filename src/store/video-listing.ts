import { defineStore } from 'pinia';
import { metaConfigStore } from '@/store/meta-config.ts';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

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

interface VideoListingState {
  count : number | null;
  next : string;
  previous : string | null;
  results : Video[];
}

export const useVideoListing = defineStore('useVideoListing', {
  state: (): VideoListingState => ({
    count: null,
    next: '',
    previous: null,
    results: [] as Video[]
  }),
  actions: {
    async setVideoListing(ProjectKey : string) {

      const metaConfigStoreData=metaConfigStore();
      const api = new myFetch();
      const authKey = getAuthData();

      const response = await api.get(
        metaConfigStoreData.endpoints['watch.content.videos.list'].replace('<str:project_key>', ProjectKey),  
        {
          Authorization: `JWT ${authKey}`
        }
      );
      console.log("hdshd", response)
      if (response.results && response.results.length > 0) {
        this.results = response.results.map((video: any) => ({
            name: video.name || '',
            max_views: video.screening_details.max_views || 0,
            views_consumed: video.screening_details?.views_consumed || 0,
            start_date: this.convertEpochToDate(video.screening_details?.start_date || 0),
            expiry_date: this.convertEpochToDate(video.screening_details?.expiry_date || 0),
            poster: video.poster || '',
            video_key: video.key || '',
            screener_key: video.screening_details?.screener_key || ''
        }));  
      } else {
        console.warn('No video data found');
      }
     
    },
    convertEpochToDate(epochTime: number) {
      const date = new Date(epochTime * 1000); // Convert from seconds to milliseconds
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }  
  }
});
