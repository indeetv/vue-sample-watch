import { defineStore } from 'pinia';
import { getAuthData } from '@/store/utils/auth.ts'; 

interface LoggedInDetailsState {
  error_msg : string;
  loggedIn : boolean;
}

export const useLoggedInStore = defineStore('loggedInDetails', {
  state : (): LoggedInDetailsState => ({
    error_msg: '',
    loggedIn: false
  }),
  getters : {

    },
  actions : {
    getLoginState() {
      const authData = getAuthData();
      this.loggedIn = (authData!=null)? true : false; 
    }
  }
});
