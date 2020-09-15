<template>
  <div>
    <div class="home"> Hello World </div>
    <div> Counter : {{counter}} </div>
    <div> Counter2 : {{counter2}} </div>
    <button @click="increment">Press Me</button>
    <button @click="increment2">Press Me Counter2</button>
  </div>
</template>
<script>
import {GET_COUNTER, SET_COUNTER, GET_COUNTER2, COUNTER1_M, COUNTER2_M} from "@/store/mutation-types";
import {mapGetters, mapActions} from 'vuex'

export default {
  name:"Home",
  methods:{
    ...mapActions({
      increment:`${COUNTER1_M}/${SET_COUNTER}`,
      increment2:`${COUNTER2_M}/${SET_COUNTER}`
    })
  },
  computed:{
    ...mapGetters({
      counter:`${COUNTER1_M}/${GET_COUNTER}`,
      counter2:`${COUNTER2_M}/${GET_COUNTER2}`,
    })
  }
}
</script>