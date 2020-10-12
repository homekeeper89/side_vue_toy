<template>
  <div class="UserRegister">
    <div>
      <span>email : </span>
      <input class="email" type="text" v-model="data.email" />
    </div>
    <div>
      <span>password : </span>
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
import { USER_NAMESPACE, REGISTER_USER } from '@/store/modules/users-type';
export default {
  name: 'UserRegister',
  data() {
    return {
      data: {
        email: '',
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
