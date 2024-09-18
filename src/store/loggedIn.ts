import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts'; 

interface LoggedInDetailsState {
  loggedIn: boolean;
}

export const useLoggedInStore = defineStore('loggedInDetails', {
  state: (): LoggedInDetailsState => ({
    loggedIn: false
  }),
  getters: {

    },
  actions: {
    getLoginState() {
      const authData = getAuthData();
      this.loggedIn = (authData!=null)? true : false; 
      console.log("LoggedIn:",this.loggedIn)
    }
  }
});
