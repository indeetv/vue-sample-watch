import { defineStore } from 'pinia';
import { productConfigState } from './types/productConfig';
import { metaConfigStore } from '@/store/meta-config.ts';
import { myFetch } from '@/store/utils/myFetch.ts';

export const useProductConfigStore = defineStore('productConfig', {
  state : (): productConfigState => {
    return {
      key: '',
      auth_type: '',
      signup_allowed: false
    };
  },
  getters : {},
  actions : {
    
    async getProductConfig() {

      const metaConfigStoreData=metaConfigStore();
      const api = new myFetch();
      
      const data = await api.get(
        metaConfigStoreData.endpoints['watch.meta.product.retrieve']+"?device=browser"
      );
        
      this.key = data.key;
      this.auth_type = data.auth_type;
      this.signup_allowed = data.signup_allowed;
             
    }
  }
});
