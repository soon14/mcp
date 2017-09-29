import Vue from 'vue'
import Vuex from 'vuex'
import "babel-polyfill";
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

// 应用初始状态
const state = {
  selectedProject: {}
};

// 定义所需的 mutations
const mutations = {
    SELECTED_PROJECT(state,{ project }) {
      state.selectedProject = project;
    }
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
