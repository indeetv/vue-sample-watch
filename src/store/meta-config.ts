import { defineStore } from 'pinia';
import { myFetch } from '@/store/utils/myFetch.ts';
import type { MetaResponse } from './types/metaConfig';

export const metaConfigStore = defineStore('metaConfig', {
  state : (): MetaResponse => {
    return {
      endpoints : {
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
        'watch.stream.player_component.retrieve': '',
        'watch.stream.view_engagement.record': '',
        'watch.content.swimlane.project.list': '',
        'watch.stream.player_function.retrieve' : ''
      },
      host : {
        name: ''
      },
      isLoaded: false
    }
  },
  getters : {},
  actions : {
    
    async getMetaConfigData() {

      try {

        const api = new myFetch();

        if(!this.isLoaded)
        {
          // Fetch the meta-endpoint data
          const data = await api.get(
            `v2/watch/meta/endpoints?device=browser`
          );
          // Update the store's state with the fetched data
          this.endpoints = (data as MetaResponse).endpoints
          this.host = (data as MetaResponse).host
          this.isLoaded = true
        }
      }
      catch(e)
      {
        this.isLoaded = false
      }
          
    } 
  }
})
