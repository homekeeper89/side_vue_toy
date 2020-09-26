<template>
  <div>
    <div class="count-show">
      <span class="count-area">{{ counter }}</span>
    </div>
    <div>
      <button class="increment-btn" @click="someMethod('name')">
        Click Me
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import {
  NAMESPACE,
  SET_COUNTER,
  GET_COUNTER,
} from '@/store/modules/example-types';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ counter: `${NAMESPACE}/${GET_COUNTER}` }),
  },
  methods: {
    ...mapActions({ increment: `${NAMESPACE}/${SET_COUNTER}` }),
    someMethod() {
      this.increment();
      console.log('someMethod');
    },
    doSomething(number) {
      return number % 2 == 0 ? true : false;
    },
  },
};
</script>
