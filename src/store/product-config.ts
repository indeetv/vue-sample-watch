import { defineStore } from 'pinia';
import type { productConfigState } from './types/productConfig';
import { myFetch } from '@/store/utils/myFetch.ts';
import getClientID from '@/store/utils/getClientID.ts';

export const useProductConfigStore = defineStore('productConfig', {
  state: (): productConfigState => {
    return {
      key: '',
      auth_type: '',
      signup_allowed: false
    };
  },
  getters: {},
  actions: {
    
    async getProductConfig() {
      const api = new myFetch();
      const token = import.meta.env.VITE_API_KEY;
      
      // Fetch the product configuration data
      const data = await api.get(
        `meta/product-config?device=browser`, 
        { 
           Authorization: `Bearer ${token}`,
          'ClientID': getClientID()
        }
      );
        
      // Update the store's state with the fetched data
      this.key = data.key;
      this.auth_type = data.auth_type;
      this.signup_allowed = data.signup_allowed;
        
      // Optionally log the data to the console for debugging
      console.log('Product Config Data:', data);
     
    }
  }
});
