import { defineStore } from 'pinia';
import { metaConfigStore } from '@/store/meta-config.ts';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

interface Project {
  key : string;
  name : string;
  poster : string;
}

interface ProjectListingState {
  count : number | null;
  next : string;
  previous : string | null;
  results : Project[];
}

export const useProjectListing = defineStore('useProjectListing', {
  state : (): ProjectListingState => ({
    count : null,
    next : '',
    previous : null,
    results : []
  }),
  actions: {
    async setProjectListing(brandKey : string) {

      const metaConfigStoreData=metaConfigStore();
      const api = new myFetch();
      const authKey = getAuthData();

      const response = await api.get(
        metaConfigStoreData.endpoints['watch.content.project.list']+`?brand=${brandKey}`,  
        {
          Authorization: `JWT ${authKey}`
        }
      );

      if (response.results && response.results.length > 0) {
        this.results = response.results;  
      } else {
        console.warn('No project data found');
      }
      
    }
  }
});
