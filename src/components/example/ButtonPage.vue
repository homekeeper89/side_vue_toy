<template>
  <div>
    <div class="count-show">
      <span class="count-area">{{ counter }}</span>
    </div>
    <div>
      <button class="increment-btn" @click="someMethod">Click Me</button>
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
  },
};
</script>
