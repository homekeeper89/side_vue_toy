import {SET_COUNTER, GET_COUNTER} from "@/store/mutation-types.js"

export const state = {
  counter:0
}

export const mutations = {
  [SET_COUNTER]:state =>state.counter++
}

export const actions = {
  [SET_COUNTER]:({commit}) => commit(SET_COUNTER)
}

export const getters = {
  [GET_COUNTER]: state => state.counter
}