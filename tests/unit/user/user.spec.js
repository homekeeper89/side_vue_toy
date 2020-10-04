import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserRegister from '@/components/user/UserRegister.vue';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';
import { userStore } from '@/store/modules/users';

const localVue = createLocalVue();
localVue.use(Vuex);

let url = '';
let body = {};
let mockError = false;
let mockResolve = {
  status_code: 200,
  msg: 'success',
};
jest.mock('axios', () => ({
  post: (_url, _body) => {
    return new Promise((resolve, rejects) => {
      if (mockError) {
        throw Error;
      }
      url = _url;
      body = _body;
      resolve(mockResolve);
    });
  },
}));

describe('User Register 와 관련된 테스트', () => {
  const username = 'test@username';
  const password = 'testPassword';
  const nickName = 'testNickname';
  let wp;
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        USERS: userStore,
      },
    });
    wp = shallowMount(UserRegister, { store, localVue });
  });

  it('html should render correctly', () => {
    expect(wp.html()).toMatchSnapshot(); // UI가 나중에 변경될까바 참고 : https://jestjs.io/docs/en/snapshot-testing
  });

  it('Component가 제대로 렌더 되는가', () => {
    expect(wp.exists()).toBe(true);
  });

  it('이메일, 비밀번호, 닉네임이 제대로 담기는가', () => {
    wp.find('.username').setValue(username);
    wp.find('.password').setValue(password);
    wp.find('.nickName').setValue(nickName);

    wp.find('.userRegister').trigger('click');

    wp.vm.$nextTick();

    expect(wp.vm.data.username).toBe(username);
    expect(wp.vm.data.password).toBe(password);
    expect(wp.vm.data.nickName).toBe(nickName);
  });
  const userCases = [
    ['', '', '', false],
    ['ke', null, '', false],
    ['ke', 'ke', 'ke', true],
  ];
  it.each(userCases)(
    'data의 fields는 null이 없어야한다.',
    (username, password, nickname, expected) => {
      wp.setData({
        data: {
          username: username,
          password: password,
          nickName: nickname,
        },
      });
      let res = wp.vm.validateData();
      expect(res).toEqual(expected);
    }
  );

  it('data를 담고 버튼을 클릭하면 data가 전송된다', async () => {
    wp.find('.username').setValue(username);
    wp.find('.password').setValue(password);
    wp.find('.nickName').setValue(nickName);

    wp.find('.userRegister').trigger('click');

    await flushPromises();
    let payload = {
      username: username,
      password: password,
      nickName: nickName,
    };
    expect(url).toBe('/api/v1/user');
    expect(body.data).toEqual(payload);
  });
});
