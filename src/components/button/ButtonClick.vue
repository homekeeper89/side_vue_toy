<template>
  <div>
    <div class="button-counter">
      <span class="counter">{{ counterNum }}</span>
    </div>
    <div class="counter__btn">
      <button class="btn" @click="increment">Click ME</button>
    </div>
  </div>
</template>
<script>
import { GET_COUNTER, SET_COUNTER, MATTHEW } from '@/store/button/types';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ButtonClick',
  data() {
    return {
      ...this.$store.state,
    };
  },
  computed: {
    ...mapGetters({ counterNum: `${MATTHEW}/${GET_COUNTER}` }),
  },
  methods: {
    ...mapActions({ increment: `${MATTHEW}/${SET_COUNTER}` }),
  },
};
</script>
