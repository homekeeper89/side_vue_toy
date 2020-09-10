import actions from "@/store/actions.js"
let url = ''
let body = {}

jest.mock("axios", ()=>({
  post:(_url, _body) =>{
    return new Promise((resolve)=>{
      url = _url
      body = _body
      resolve(true)
    })
  }
}))

describe("Actions 관련", ()=>{
  it("유저 등록 api를 호출한다", async ()=>{
    const email = "email"
    const password = "password"
    const nickName = 'nickName'

    await actions.registerUser({email, password, nickName})

    expect(url).toBe("/api/v1/users")
    expect(body).toEqual({email, password, nickName})

  })
})