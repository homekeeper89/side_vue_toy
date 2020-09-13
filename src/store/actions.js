import axios from "axios"

export default {
  async REGISTER_USER({email, password, nickName}){
    console.log(2222)
    const res = await axios.post("/api/v1/users", {
      email, password, nickName
    }) 
  }
}