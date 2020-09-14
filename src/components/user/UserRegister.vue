<template>
  <div class="UserRegister">
    <div>
      <input class="email" type="text" v-model="data.username">
    </div>
    <div>
      <input class="password" type="text" v-model="data.password">
    </div>
    <div>
      <input class="nickName" type="text" v-model="data.nickName">
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
import { mapActions } from 'vuex';
export default {
  name:"UserRegister",
  data(){
    return{
      data:{
        username:'',
        password:'',
        nickName:''
      }
    }
  },
  methods:{
    // ...mapActions({registerUser:'REGISTER_USER'}),
    register(){
      this.$store.dispatch('testAction', { msg: 'Test Dispatch' });
      // console.log("111")
      // this.registerUser(this.data)
    },
    registerBtn(){
      this.$store.dispatch('REGISTER_USER', this.data);
    }
  }
}
</script>