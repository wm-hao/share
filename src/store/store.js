import Vue from 'vue'
import Vuex from 'vuex'
import {store_s_token_key, store_f_changeLogin} from "../const";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem(store_s_token_key) ? localStorage.getItem(store_s_token_key) : ''
  },
  mutations: {
    [store_f_changeLogin](state, user) {
      let token = user.authToken;
      state.token = token;
      localStorage.setItem(store_s_token_key, token);
    }
  }
});

export default store;
