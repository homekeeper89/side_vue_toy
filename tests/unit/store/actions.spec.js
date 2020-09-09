import actions from "@/store/actions.js"

describe("Actions 관련", ()=>{
  it("유저 등록 api를 호출한다", async ()=>{
    const commit = jest.fn()
    const email = "email"
    const password = "password"
    const nickName = 'nickName'

    await actions.registerUser({commit}, {email, password, nickName})

    expect(url).toBe("/api/v1/users")
    expect(body).toEqual({email, password, nickName})

  })
})