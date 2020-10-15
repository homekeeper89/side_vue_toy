<template>
  <div class="UserRegister">
    <div>
      <span>email : </span>
      <input class="email" type="text" v-model="data.email" />
    </div>
    <div v-if="isEmailDuplicated" class="error__email--duplicated">
      <h3>이메일이 사용 중 입니다. 다른 이메일을 입력하여 주세요</h3>
    </div>
    <div>
      <span>password : </span>
      <input class="password" type="text" v-model="data.password" />
      <span>password_again : </span>
      <input class="password_re" type="text" v-model="password_re" />
    </div>
    <div v-if="!isPasswordSame" class="error__password--input">
      <h3>패스워드가 맞지 않습니다.</h3>
    </div>
    <div>
      <input class="nickname" type="text" v-model="data.nickname" />
    </div>
    <div>
      <button class="userRegister" @click="register">등록</button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { USER_NAMESPACE, REGISTER_USER } from '@/store/modules/users-type';
export default {
  name: 'UserRegister',
  data() {
    return {
      data: {
        email: '',
        password: '',
        nickname: '',
      },
      password_re: '',
    };
  },
  computed: {
    ...mapGetters({ apiStatus: `${USER_NAMESPACE}/apiStatus` }),
    isEmailDuplicated() {
      console.log(this.apiStatus);
      return this.apiStatus.code == 200 ? false : true;
    },
    isPasswordSame() {
      return this.data.password == this.password_re;
    },
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
