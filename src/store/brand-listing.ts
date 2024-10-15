import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';
import { textChangeRangeIsUnchanged } from 'typescript';

interface BrandEntity {
  name : string;
  key : string;
  logo : string | null;
}

interface BrandKeyState {
  count : number | null;
  next : string;
  previous : string | null;
  results : BrandEntity[];
}

export const useBrandData = defineStore('useBrandKey', {
  state : (): BrandKeyState => ({
    count : null,
    next : '',
    previous : null,
    results : []
  }),
  getters : {
  },
  actions : {
    async fetchBrandListing(endpoint : string, brandKey? : string, isFull? : boolean) {
      
      const api = new myFetch();
      const authKey = getAuthData();

      const response = await api.get(
        `${isFull ? endpoint : `${endpoint}${brandKey ? `?brand=${brandKey}` : ''}`}`,
        {
          Authorization : `JWT ${authKey}`,
        },
        isFull
      );

      // Process each item in the response results
      if (response.results.length > 0) {
        const brandsArray: BrandEntity[] = response.results.map((brandData: any) => ({
          name : brandData.name,
          key : brandData.key,
          logo : brandData.logo || null, 
        }));

        this.results = [...this.results,...brandsArray];
        
      } else {
        console.warn('No brand data found');
      }
      
    },

    async resetBrandStore()
    {
      this.count = null;
      this.next = '';
      this.previous = null;
      this.results = [];
    }
  }
});
