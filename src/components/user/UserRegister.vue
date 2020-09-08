<template>
  <div class="UserRegister">
    <div>
      <input class="username" type="text" v-model="data.username">
    </div>
    <div>
      <button class="register" type="submit" @click="register">등록</button>
    </div>
  </div>
</template>
<script>
export default {
  name:"UserRegister",
  data(){
    return{
      data:{
        username:''
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