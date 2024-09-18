import { defineStore } from 'pinia';
import { myFetch } from '@/store/utils/myFetch.ts';
import { getAuthData } from '@/store/utils/auth.ts';
import getClientID from '@/store/utils/getClientID.ts';

interface Brand {
  key: string;
  keyword: string;
  name: string;
  logo: string | null;
  header: string | null;
}

interface BrandKeyState {
  brands: Brand[];
}

export const useBrandKey = defineStore('useBrandKey', {
  state: (): BrandKeyState => ({
    brands: []
  }),
  getters: {
  },
  actions: {
    async setBrandKey() {
      try {
        const api = new myFetch();
        const authKey = getAuthData();
        const clientID = getClientID();

        const response = await api.get(
          'content/brands',
          {
            Authorization: `JWT ${authKey}`,
            ClientID: clientID
          }
        );

        // Process each item in the response results
        if (response.results.length > 0) {
          const brandsArray: Brand[] = response.results.map((brandData: any) => ({
            key: brandData.key,
            keyword: brandData.keyword,
            name: brandData.name,
            logo: brandData.logo || null, // Store null if logo is not present
            header: brandData.header || null // Store null if header is not present
          }));

          // Update state with the array of brand objects
          this.brands = brandsArray;

          // For debugging purposes
          // console.log('Brands Array:', this.brands);
        } else {
          console.warn('No brand data found');
        }
      } catch (error) {
        console.error('Failed to fetch brand key data:', error);
      }
    }
  }
});
