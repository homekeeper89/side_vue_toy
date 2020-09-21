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
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    someMethod() {
      console.log('someMethod');
    },
    doSomething(number) {
      return number % 2 == 0 ? true : false;
    },
  },
};
</script>
