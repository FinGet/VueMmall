import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js'
import * as getters from './getter.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	getters,
	mutations
})
export default store