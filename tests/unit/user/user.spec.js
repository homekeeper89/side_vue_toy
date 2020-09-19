import {shallowMount, createLocalVue, mount} from "@vue/test-utils"
import UserRegister from "@/components/user/UserRegister.vue"
import flushPromises from 'flush-promises';
import Vuex from "vuex"
import REGISTER_USER from "@/store/actions.js"

const localVue = createLocalVue()
localVue.use(Vuex)

const createStore = (overrides) =>{
  const defaultStoreConfig = {

  }
  return new Vuex.Store(overrides)
  // return new Vuex.Store(
  //   merge(defaultStoreConfig, overrides)
  // ) TODO : merge 함수 구현
}

const createWrapper = (overrides) =>{
  const defaultMountingOptions = {
    localVue,
    store : overrides
  }
  return mount(UserRegister, defaultMountingOptions)
}

let url = ''
let body = ''

jest.mock("axios", ()=>({
  post:(_url, _body) =>{
    new Promise((resolve)=>{
      url = _url
      body = _body
      resolve(true)
    })
  }
}))


describe("User Register 와 관련된 테스트", ()=>{

  const email = "test@email"
  const password = "testPassword"
  const nickName = "testNickname"
  let wp;
  beforeEach(()=>{
    wp = createWrapper()
  })

  it("html should render correctly", ()=>{
    expect(wp.html()).toMatchSnapshot() // UI가 나중에 변경될까바 참고 : https://jestjs.io/docs/en/snapshot-testing
  })

  it.skip("After Register Successfully", async ()=>{
    let actions = {REGISTER_USER:jest.fn().mockResolvedValue()}
    // const store = createStore({actions})
    // const wp = createWrapper({store})
    const store = new Vuex.Store(actions)
    const wp = shallowMount(UserRegister, {
      localVue,
      store
    })

    wp.setData({data:{
      username:'test',
      password:'test',
      nickName:'test'
    }})

    const registerBtn = wp.find(".userRegisterBtn")
    registerBtn.trigger("click")

    await flushPromises()

    expect(actions[REGISTER_USER]).toHaveBeenCalled()
  })

  it("나만의 전체 테스트", async ()=>{
    const mockStore = { dispatch: jest.fn() };

    const wrapper = shallowMount(UserRegister, {
      mocks: {
        $store: mockStore,
      },
    });
    wrapper.find(".userRegister").trigger("click")
    await wrapper.vm.$nextTick();
    // await flushPromises()

    expect(mockStore.dispatch).toHaveBeenCalledWith('testAction', {
      msg: 'Test Dispatch',
    });
  })


  it("Component가 제대로 렌더 되는가", ()=>{
    const wrapper = shallowMount(UserRegister)
    expect(wrapper.exists()).toBe(true)
  })

  it("이메일, 비밀번호, 닉네임이 제대로 담기는가", ()=>{
    const wrapper = shallowMount(UserRegister)

    wrapper.find(".email").setValue(email)
    wrapper.find(".password").setValue(password)
    wrapper.find(".nickName").setValue(nickName)

    wrapper.find(".userRegister").trigger("click")

    wrapper.vm.$nextTick()

    expect(wrapper.vm.data.username).toBe(email)
    expect(wrapper.vm.data.password).toBe(password)
    expect(wrapper.vm.data.nickName).toBe(nickName)
  })

  it.skip("담은 이메일, 비밀번호가 버튼 클릭과 연동 되는가", async ()=>{
    const wrapper = shallowMount(UserRegister)

    wrapper.find(".email").setValue(email)
    wrapper.find(".password").setValue(password)
    wrapper.find(".nickName").setValue(nickName)

    wrapper.find(".userRegister").trigger("click")

    await flushPromises();

    expect(url).toBe("/api/v1/users")
    expect(body).toEqual({email, password, nickName})
  })
})