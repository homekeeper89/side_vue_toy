import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserRegister from '@/components/user/UserRegister.vue';
import flushPromises from 'flush-promises';
import { users } from '@/store/modules/users';
import mockAxios from 'axios';
import { getUrlFromSpy, getDataFromSpy } from '../../test-helper.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('User Register 와 관련된 테스트', () => {
  const status = {
    status_code: 200,
    msg: 'success',
  };
  const username = 'test@username';
  const password = 'testPassword';
  const nickName = 'testNickname';
  let wp;
  let store;
  let spyPost;
  beforeEach(() => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: status })
    );
    spyPost = jest.spyOn(mockAxios, 'post');
    store = new Vuex.Store({
      modules: {
        users,
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

  it.skip('data를 담고 버튼을 클릭하면 data가 전송된다', async () => {
    wp.find('.username').setValue(username);
    wp.find('.password').setValue(password);
    wp.find('.nickName').setValue(nickName);

    wp.find('.userRegister').trigger('click');

    let data = {
      username: username,
      password: password,
      nickName: nickName,
    };
    await flushPromises();

    let url = getUrlFromSpy(spyPost);
    let body = getDataFromSpy(spyPost);

    expect(url).toBe('/api/users/v1');
    expect(body).toEqual({ data: data });
  });
});
