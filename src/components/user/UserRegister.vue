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
      <button class="userRegister" type="submit" @click="register">등록</button>
    </div>
  </div>
</template>
<script>
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
    register(){
      return this.data
    }
  }
}
</script>