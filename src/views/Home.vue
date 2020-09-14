<template>
  <div>
    <div class="home"> Hello World </div>
    <div> Counter : {{counter}} </div>
    <button @click="increment">Press Me</button>
  </div>
</template>
<script>
import {GET_COUNTER, SET_COUNTER} from "@/store/mutation-types";
import {mapGetters, mapActions} from 'vuex'

export default {
  name:"Home",
  methods:{
    ...mapActions({
      increment:SET_COUNTER
    })
  },
  computed:{
    ...mapGetters({
      counter:GET_COUNTER
    })
  }
}
</script>