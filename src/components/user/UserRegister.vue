<template>
  <div class="UserRegister">
    <div>
      <input class="username" type="text" v-model="data.username" />
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
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { USER_NAMESPACE, REGISTER_USER } from '@/store/modules/types';
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
    ...mapActions({ registerUser: `${USER_NAMESPACE}/${REGISTER_USER}` }),
    register() {
      let payload = this.data;
      this.registerUser(payload);
    },
    validateData() {
      let res = Object.keys(this.data).filter((item) => !this.data[item]);
      return res.length != 0 ? false : true;
    },
  },
};
</script>
