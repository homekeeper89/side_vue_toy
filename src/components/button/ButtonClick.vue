<template>
  <div>
    <div class="button-counter">
      <span class="counter">{{counter}}</span>
    </div>
    <div class="button-btn">
      <button class="btn">Click ME</button>
    </div>
  </div>
</template>
<script>
import { GET_COUNTER, CUSTOMCOUNTER } from "@/store/button/types";
import { mapGetters } from "vuex";
export default {
  name: "ButtonClick",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ counter: `${CUSTOMCOUNTER}/${GET_COUNTER}` }),
  },
};
</script>