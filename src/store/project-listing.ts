import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

interface ProjectEntity {
  name : string;
  key : string;
  poster : string;
}

interface ProjectListingState {
  count : number | null;
  next : string;
  previous : string | null;
  results : ProjectEntity[];
}

export const useProjectListing = defineStore('useProjectListing', {
  state : (): ProjectListingState => ({
    count : null,
    next : '',
    previous : null,
    results : []
  }),
  actions: {
    
    async fetchProjectListing(endpoint : string, brandKey? : string, isFull? : boolean)
    {

      const api = new myFetch();
      const authKey = getAuthData();
        
      const response: any = await api.get(
        `${isFull ? endpoint : `${endpoint}${brandKey ? `?brand=${brandKey}` : ''}`}`, 
        {
          Authorization: `JWT ${authKey}`
        },
        isFull
      );

      if (response.results && response.results.length > 0) {

        const projectsArray: ProjectEntity[] = response.results.map((projectData: any) => ({
          name : projectData.name,
          key : projectData.key,
          logo : projectData.poster || null, 
        }));

        this.next = response.next || '';
        this.results = [...this.results, ...projectsArray];

      } else {
        console.warn('No project data found');
      }
      
    },

    async resetProjectStore()
    {
      this.count = null;
      this.next = '';
      this.previous = null;
      this.results = [];
    }
  }
});
