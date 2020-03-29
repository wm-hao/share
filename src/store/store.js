import Vue from 'vue'
import Vuex from 'vuex'
import {store_s_token_key, store_f_changeLogin, store_s_step_key, store_f_changeStep} from "../const";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem(store_s_token_key) ? localStorage.getItem(store_s_token_key) : '',
    activeStep: localStorage.getItem(store_s_step_key) ? localStorage.getItem(store_s_step_key) : 0
  },
  mutations: {
    [store_f_changeLogin](state, authToken) {
      state.token = authToken;
      localStorage.setItem(store_s_token_key, authToken);
    },
    [store_f_changeStep](state, next) {
      let step = Number(0);
      if (!next) {
        step = Number(state.activeStep) + 1;
      }
      state.activeStep = step;
      localStorage.setItem(store_s_step_key, step.toString());
    }
  }
});

export default store;
