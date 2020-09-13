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
      <button class="dispatch" @click="handleDispatch">Dispatch</button>
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
    handleDispatch() {
      this.$store.dispatch('testHandle', { msg: 'Test Dispatch' });
    },
    register(){
      this.$store.dispatch('testAction', { msg: 'Test Dispatch' });
      // console.log("111")
      // this.registerUser(this.data)
    }
  }
}
</script>