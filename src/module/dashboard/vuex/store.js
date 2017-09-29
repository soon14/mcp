import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

const  vuex_store = new Vuex.Store({
    state:{
        data:[]
    },
    mutations:{
        showData(state){
            alert(state.Data);
        }
    }
})

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
