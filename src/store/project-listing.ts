import { defineStore } from 'pinia';
import { myFetch } from '@/store/utils/myFetch.ts';
import { getAuthData } from '@/store/utils/auth.ts';
import { metaConfigStore } from '@/store/meta-config.ts';
import getClientID from '@/store/utils/getClientID.ts';

interface Project {
  key: string;
  name: string;
  poster: string;
}

interface ProjectListingState {
  count: number | null;
  next: string;
  previous: string | null;
  results: Project[];
}

export const useProjectListing = defineStore('useProjectListing', {
  state: (): ProjectListingState => ({
    count: null,
    next: '',
    previous: null,
    results: []
  }),
  actions: {
    async setProjectListing(brandKey : string) {
      try {
        const metaConfigStoreData=metaConfigStore();
        const api = new myFetch();
        const authKey = getAuthData();
        const clientID = getClientID();

        const response = await api.get(
          metaConfigStoreData.endpoints['watch.content.project.list']+`?brand=${brandKey}`,  
          {
            Authorization: `JWT ${authKey}`,
            ClientID: clientID
          }
        );

        if (response.results && response.results.length > 0) {
          this.results = response.results;  
        } else {
          console.warn('No brand data found');
        }
        console.log("Project Listing: ",this.results)
      } catch (error) {
        console.error('Failed to fetch brand key data:', error);
      }
    }
  }
});
