import {SET_COUNTER, GET_COUNTER2} from "@/store/mutation-types"

export const counter2 = {
  namespace:true,
  state :{
    counter2:0
  },
  actions:{
    [SET_COUNTER] : ({commit}) => commit(SET_COUNTER)
  },
  mutations:{
    [SET_COUNTER] : state => state.counter2++
  },
  getters:{
    [GET_COUNTER2]:state => state.counter
  }
}
