export const count = state => state.count
export const userName = state => state.userName
export const age = state => state.userName
export const sex = state => {return state.sex?'男':'女'} 
// Getter 也可以接受其他 getter 作为第二个参数
export const nameLen = (state,getters) => {return getters.userName.length}