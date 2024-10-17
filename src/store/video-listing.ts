import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

interface VideoEntity {
    name : string;
    key : string;
    poster : string;
    max_views : number;
    start_date : string;
    expiry_date : string;
    expired : string;
    screener_key : string;
    remaining_views : number;
}

interface VideoListingState {
  count : number | null;
  next : string;
  previous : string | null;
  results : VideoEntity[];
}

export const useVideoListing = defineStore('useVideoListing', {
  state: (): VideoListingState => ({
    count: null,
    next: '',
    previous: null,
    results: []
  }),
  actions: {

    async fetchVideoListing(endpoint : string, projectKey? : string, isFull? : boolean) {

      const api = new myFetch();
      const authKey = getAuthData();
      
      const response: any = await api.get(
        endpoint.includes('<str:')
				? endpoint.replace('<str:project_key>', projectKey || '')
				: endpoint, 
        {
          Authorization: `JWT ${authKey}`
        },
        isFull
      );

      if (response.results && response.results.length > 0) {
        const videoArray: VideoEntity[]  = response.results.map((video: any) => ({
            name: video.name || '',
            key: video.key || '',
            poster: video.poster || '',
            max_views: video.screening_details.max_views || 0,
            start_date: this.convertEpochToDate(video.screening_details?.start_date || 0),
            expiry_date: this.convertEpochToDate(video.screening_details?.expiry_date || 0),
            expired: video.screening_details?.expired,
            screener_key: video.screening_details?.screener_key || '',
            remaining_views: video.screening_details?.max_views - video.screening_details?.views_consumed
        }));  

        this.next = response.next || '';
        this.results = [...this.results,...videoArray];

      } else {
        console.warn('No video data found');
      }
     
    },

    async resetVideoStore()
    {
      this.count = null;
      this.next = '';
      this.previous = null;
      this.results = [];
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
