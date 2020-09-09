import axios from "axios"

export default {
  async registerUser({email, password, nickName}){
    const res = await axios.post("/api/vi/users", {
      email, password, nickName
    }) 
  }
}