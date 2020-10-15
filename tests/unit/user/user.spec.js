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
  const email = 'test@username';
  const password = 'testPassword';
  const nickname = 'testnickname';
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
    wp.find('.email').setValue(email);
    wp.find('.password').setValue(password);
    wp.find('.nickname').setValue(nickname);

    wp.find('.userRegister').trigger('click');

    wp.vm.$nextTick();

    expect(wp.vm.data.email).toBe(email);
    expect(wp.vm.data.password).toBe(password);
    expect(wp.vm.data.nickname).toBe(nickname);
  });

  const userCases = [
    ['', '', '', false],
    ['ke', null, '', false],
    ['ke', 'ke', 'ke', true],
  ];
  it.each(userCases)(
    'data의 fields는 null이 없어야한다.',
    (email, password, nickname, expected) => {
      wp.setData({
        data: {
          email: email,
          password: password,
          nickname: nickname,
        },
      });
      let res = wp.vm.validateData();
      expect(res).toEqual(expected);
    }
  );

  it('비밀번호가 서로 다르면 메세지를 띄워줘야한다', async () => {
    // NOTE v-if가 제대로 테스트가 안됬음. 해결책 https://github.com/vuejs/vue-test-utils/issues/1384
    expect(wp.find('.error__password--input').exists()).toBe(false);

    let wrongPwd = '12345';
    wp.find('.password').setValue(password);
    wp.find('.password_re').setValue(wrongPwd);
    await wp.vm.$nextTick();

    expect(wp.find('.error__password--input').exists()).toBe(true);
    let res = wp.find('.error__password--input').text();
    expect(res).toBe('패스워드가 맞지 않습니다.');
  });

  it('비밀번호 체크는 실시간으로 되야한다', () => {
    let wrongPwd = '12345';
    wp.find('.password').setValue(password);
    wp.find('.password_re').setValue(wrongPwd);
    expect(wp.vm.isPasswordSame).toBe(false);

    wp.find('.password').setValue(password);
    wp.find('.password_re').setValue(password);
    expect(wp.vm.isPasswordSame).toBe(true);
  });

  it('이메일 중복 검사 성공 / 실패 안내 문구 ', async () => {
    let getters = {
      apiStatus: () => {
        return {
          code: 200,
          msg: '',
        };
      },
    };
    users.getters = getters;
    store = new Vuex.Store({
      modules: {
        users,
      },
    });
    wp = shallowMount(UserRegister, { store, localVue });
    await expect(wp.find('.error__email--duplicated').exists()).toBe(false);
  });

  it('data를 담고 버튼을 클릭하면 data가 전송된다', async () => {
    wp.find('.email').setValue(email);
    wp.find('.password').setValue(password);
    wp.find('.nickname').setValue(nickname);

    wp.find('.userRegister').trigger('click');

    let data = {
      email: email,
      password: password,
      nickname: nickname,
    };
    await flushPromises();

    let url = getUrlFromSpy(spyPost);
    let body = getDataFromSpy(spyPost);

    expect(url).toBe('/api/users/v1');
    expect(body).toEqual({ data: data });
  });
});
