import { defineStore } from 'pinia';
import type { MetaResponse } from './types/meta';
import { myFetch } from '@/store/utils/myFetch.ts';
import getClientID from '@/store/utils/getClientID.ts';

export const metaConfigStore = defineStore('metaConfig', {
  state: (): MetaResponse => {
    return {
      endpoints: {
        'watch.meta.product.retrieve': '',
        'watch.meta.feature_support': '',
        'watch.auth.session.login': '',
        'watch.auth.session.refresh': '',
        'watch.auth.session.logout': '',
        'watch.auth.session.qr.get_login_code': '',
        'watch.auth.session.qr.login': '',
        'watch.auth.session.qr.get_token': '',
        'watch.auth.password.forgot_password': '',
        'watch.auth.password.reset_password': '',
        'watch.content.brand.list': '',
        'watch.content.project.list': '',
        'watch.content.genre.list': '',
        'watch.content.carousel_image.list': '',
        'watch.content.swimlane.list': '',
        'watch.content.videos.list': '',
        'watch.content.project.retrieve': '',
        'watch.content.video.retrieve': '',
        'watch.content.screener.2fa': '',
        'watch.content.watchlist_project.add': '',
        'watch.content.watchlist_project.list': '',
        'watch.content.watchlist_project.delete': '',
        'watch.stream.session.playback': '',
        'watch.stream.view_engagement.record': '',
        'watch.content.swimlane.project.list': ''
      },
      host: {
        name: ''
      }
    }
  },
  getters: {},
  actions: {
    /**
     * Used to get meta config data and set the state accordingly
     *
     */
    async getMetaConfigData() {
        const api = new myFetch();
        const token = import.meta.env.VITE_API_KEY;

        // Fetch the product configuration data
        const data = await api.get(
        `meta/endpoints?device=browser`,
        { 
            Authorization: `Bearer ${token}`,
            'ClientID': getClientID()
        }
      );
          
        // Update the store's state with the fetched data
        this.endpoints = (data as MetaResponse).endpoints
        this.host = (data as MetaResponse).host
          
        // Optionally log the data to the console for debugging
        console.log('Meta Config Data:', data);
    } 
    
  }
})
