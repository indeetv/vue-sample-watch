import { defineStore } from 'pinia';
import { productConfigState } from './types/productConfig';
import { metaConfigStore } from '@/store/meta-config.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

export const useProductConfigStore = defineStore('productConfig', {
  state : (): productConfigState => {
    return {
      key: '',
      auth_type: '',
      logo_image: '',
      signup_allowed: false
    };
  },
  getters : {},
  actions : {
    
    async getProductConfig() {

      const metaConfigStoreData=metaConfigStore();
      const api = new myFetch();
      
      const response: any = await api.get(
        metaConfigStoreData.endpoints['watch.meta.product.retrieve']+"?device=browser"
      );
        
      this.key = response.key;
      this.auth_type = response.auth_type;
      this.logo_image = response.assets?.logo_image?.links?.[0] ?? '';
      this.signup_allowed = response.signup_allowed;

    }
  }
});
