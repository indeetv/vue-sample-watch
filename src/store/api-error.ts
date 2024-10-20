import { defineStore } from 'pinia';

interface ErorrApiState {
  api_error_msg : string;
  isError : boolean;
}

export const useApiErrorData = defineStore('ErrorApiDetails', {
  state : (): ErorrApiState => ({
    api_error_msg: '',
    isError: false
  }),
  getters : {

    },
  actions : {
    setApiErrorMsg(msg : string) {
        this.api_error_msg = msg;
        this.isError = true; 
    },

    resetApiErrorMsg() {
        this.api_error_msg = "";
        this.isError = false;
    }
  }
});
