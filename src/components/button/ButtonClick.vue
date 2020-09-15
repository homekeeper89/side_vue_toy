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
export default {
  name: "ButtonClick",
  data() {
    return {
      counter: 0,
    };
  },
};
</script>