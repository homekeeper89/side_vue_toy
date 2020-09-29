import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserRegister from '@/components/user/UserRegister.vue';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

let url = '';
let body = '';

jest.mock('axios', () => ({
  post: (_url, _body) => {
    new Promise((resolve) => {
      url = _url;
      body = _body;
      resolve(true);
    });
  },
}));

describe('User Register 와 관련된 테스트', () => {
  const email = 'test@email';
  const password = 'testPassword';
  const nickName = 'testNickname';
  let wp;
  beforeEach(() => {
    wp = shallowMount(UserRegister);
  });

  it('html should render correctly', () => {
    expect(wp.html()).toMatchSnapshot(); // UI가 나중에 변경될까바 참고 : https://jestjs.io/docs/en/snapshot-testing
  });

  it('Component가 제대로 렌더 되는가', () => {
    const wp = shallowMount(UserRegister);
    expect(wp.exists()).toBe(true);
  });

  it('이메일, 비밀번호, 닉네임이 제대로 담기는가', () => {
    wp.find('.email').setValue(email);
    wp.find('.password').setValue(password);
    wp.find('.nickName').setValue(nickName);

    wp.find('.userRegister').trigger('click');

    wp.vm.$nextTick();

    expect(wp.vm.data.username).toBe(email);
    expect(wp.vm.data.password).toBe(password);
    expect(wp.vm.data.nickName).toBe(nickName);
  });
  const userCases = [
    ['', '', '', false],
    ['ke', null, '', false],
    ['ke', 'ke', 'ke', true],
  ];
  it.each(userCases)(
    '등록시 fields는 모두 채워져 있어야한다',
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
});
