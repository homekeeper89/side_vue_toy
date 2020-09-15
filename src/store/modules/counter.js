import {SET_COUNTER, GET_COUNTER} from "@/store/mutation-types"

export const counter = {
  namespace:true,
  state :{
    counter:0
  },
  actions:{
    [SET_COUNTER] : ({commit}) => commit(SET_COUNTER)
  },
  mutations:{
    [SET_COUNTER] : state => state.counter++
  },
  getters:{
    [GET_COUNTER]:state => state.counter
  }
}
