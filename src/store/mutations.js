import * as types from './mutation-types.js'

const mutations = {
	[types.ADD_COUNT](state) {
		state.count ++ ;
	},
	[types.MINUS_COUNT](state) {
		state.count -- ;
	},
	[types.CHANGE_NAME](state,name) {
		state.userName = name
	},
	[types.CHANGE_SEX](state,sex) {
		state.sex = sex
	}
}

export default mutations