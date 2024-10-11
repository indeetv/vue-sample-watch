import { defineStore } from 'pinia';
import { metaConfigStore } from '@/store/meta-config.ts';
import { getAuthData } from '@/store/utils/auth.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

interface Brand {
  key : string;
  name : string;
  logo : string | null;
}

interface BrandKeyState {
  brands : Brand[];
}

export const useBrandData = defineStore('useBrandKey', {
  state : (): BrandKeyState => ({
    brands : []
  }),
  getters : {
  },
  actions : {
    async setBrandData() {
      
      const metaConfigStoreData = metaConfigStore();
      const api = new myFetch();
      const authKey = getAuthData();

      const response = await api.get(
        metaConfigStoreData.endpoints['watch.content.brand.list'],
        {
          Authorization : `JWT ${authKey}`,
        }
      );

      // Process each item in the response results
      if (response.results.length > 0) {
        const brandsArray: Brand[] = response.results.map((brandData: any) => ({
          key : brandData.key,
          name : brandData.name,
          logo : brandData.logo || null, 
        }));

        this.brands = brandsArray;
        
      } else {
        console.warn('No brand data found');
      }
      
    }
  }
});
