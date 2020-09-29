<template>
  <div class="UserRegister">
    <div>
      <input class="email" type="text" v-model="data.username" />
    </div>
    <div>
      <input class="password" type="text" v-model="data.password" />
    </div>
    <div>
      <input class="nickName" type="text" v-model="data.nickName" />
    </div>
    <div>
      <button class="userRegister" @click="register">등록</button>
    </div>
    <div>
      <button class="userRegisterBtn" @click="registerBtn">등록</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserRegister',
  data() {
    return {
      data: {
        username: '',
        password: '',
        nickName: '',
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch('testAction', { msg: 'Test Dispatch' });
    },
    registerBtn() {
      this.$store.dispatch('REGISTER_USER', this.data);
    },
    validateData() {
      let items = this.data;
      let res = Object.keys(items).filter((item) => !items[item]);
      return res.length != 0 ? false : true;
    },
  },
};
</script>
