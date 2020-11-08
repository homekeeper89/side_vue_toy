<template>
  <div class="UserRegister">
    <div>
      <span>email : </span>
      <input class="email" type="text" v-model="data.email" />
    </div>
    <div>
      <button class="button__email--check" @click="checkEmail">
        이메일 중복 체크
      </button>
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
import {
  USER_NAMESPACE,
  REGISTER_USER,
  CHECK_EMAIL,
} from '@/store/modules/users-type';
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
      return this.apiStatus.code == 200 ? false : true;
    },
    isPasswordSame() {
      return this.data.password == this.password_re;
    },
  },
  methods: {
    ...mapActions({
      registerUser: `${USER_NAMESPACE}/${REGISTER_USER}`,
      checkUserEmail: `${USER_NAMESPACE}/${CHECK_EMAIL}`,
    }),
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    checkEmail() {
      let payload = this.data.email;
      if (this.validateData(payload)) {
        this.checkUserEmail(payload);
      }
    },
    register() {
      let payload = this.data;
      if (this.validateData(payload)) {
        this.registerUser(payload);
      }
    },
    validateData(data) {
      let res = Object.keys(data).filter((item) => !data[item]);
      return res.length != 0 ? false : true;
    },
  },
};
</script>
