<template>
  <div>
    <div class="button-counter">
      <span class="counter">{{ counterNum }}</span>
    </div>
    <div class="button-btn">
      <button class="btn">Click ME</button>
    </div>
  </div>
</template>
<script>
import { GET_COUNTER, MATTHEW } from '@/store/button/types';
import { mapGetters } from 'vuex';
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
};
</script>
