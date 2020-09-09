import {shallowMount} from "@vue/test-utils"
import UserRegister from "@/components/user/UserRegister.vue"

describe("User Register 와 관련된 테스트", ()=>{
  it("Component가 제대로 렌더 되는가", ()=>{
    const wrapper = shallowMount(UserRegister)

    expect(wrapper.exists()).toBe(true)
  })

  it('버튼이 클릭 되는지 확인', async ()=>{
    const wrapper = shallowMount(UserRegister)
    expect(wrapper.vm.register()).toEqual({username:"", password:'', nickName:''})
  })

  it("이메일, 비밀번호, 닉네임이 제대로 담기는가", ()=>{
    const wrapper = shallowMount(UserRegister)

    const email = "test@email"
    const password = "testPassword"
    const nickName = "testNickname"

    wrapper.find(".email").setValue(email)
    wrapper.find(".password").setValue(password)
    wrapper.find(".nickName").setValue(nickName)

    wrapper.find(".userRegister").trigger("click")

    wrapper.vm.$nextTick()

    expect(wrapper.vm.data.username).toBe(email)
    expect(wrapper.vm.data.password).toBe(password)
    expect(wrapper.vm.data.nickName).toBe(nickName)
  })
})