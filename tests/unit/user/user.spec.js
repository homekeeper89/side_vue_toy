import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserRegister from '@/components/user/UserRegister.vue';
import flushPromises from 'flush-promises';
import {
  users,
  api_check_email,
  api_register_user,
} from '@/store/modules/users';
import mockAxios from 'axios';
import { getUrlFromSpy, getDataFromSpy } from '../../test-helper.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('User Register 와 관련된 테스트', () => {
  const status = {
    status_code: 200,
    msg: 'success',
  };
  const EMAIL = 'test@username';
  const PASSWORD = 'testPassword';
  const NICKNAME = 'testnickname';
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

  afterEach(() => {
    // jest.called가 리셋이 안되서 수정
    jest.clearAllMocks();
  });

  it('html should render correctly', () => {
    expect(wp.html()).toMatchSnapshot(); // UI가 나중에 변경될까바 참고 : https://jestjs.io/docs/en/snapshot-testing
  });

  it('요소들은 제대로 페이지 렌더가 되어있는가', () => {
    expect(wp.find('.button__email--check').exists()).toBe(true);
  });

  const emailCase = [
    ['success@email.com', true],
    ['fail-email', false],
    ['asdf123213123', false],
    ['ass____@mail.com', true],
  ];
  it.each(emailCase)(
    '이메일 체크 함수는 이메일을 구분 해야한다',
    (email, expected) => {
      let res = wp.vm.validateEmail(email);
      expect(res).toBe(expected);
    }
  );

  it.each(emailCase)(
    '이메일 중복 체크 버튼 클릭은 성공해야한다',
    async (email) => {
      const spyMethod = jest.spyOn(wp.vm, 'validateData');
      wp.find('.email').setValue(email);
      wp.find('.button__email--check').trigger('click');
      await flushPromises();

      let url = getUrlFromSpy(spyPost);
      let body = getDataFromSpy(spyPost);
      expect(spyMethod).toHaveBeenCalled();
      expect(url).toBe(api_check_email);
      expect(body).toEqual({ data: email });
    }
  );

  it('Component가 제대로 렌더 되는가', () => {
    expect(wp.exists()).toBe(true);
  });

  it('이메일, 비밀번호, 닉네임이 제대로 담기는가', () => {
    wp.find('.email').setValue(EMAIL);
    wp.find('.password').setValue(PASSWORD);
    wp.find('.nickname').setValue(NICKNAME);

    wp.find('.userRegister').trigger('click');

    wp.vm.$nextTick();

    expect(wp.vm.data.email).toBe(EMAIL);
    expect(wp.vm.data.password).toBe(PASSWORD);
    expect(wp.vm.data.nickname).toBe(NICKNAME);
  });

  const userCases = [
    ['', '', '', false],
    ['ke', null, '', false],
    ['ke', 'ke', 'ke', true],
  ];
  it.each(userCases)(
    'data의 fields는 null이 없어야한다.',
    (email, password, nickname, expected) => {
      let data = {
        email: email,
        password: password,
        nickname: nickname,
      };
      let res = wp.vm.validateData(data);
      expect(res).toEqual(expected);
    }
  );

  it('비밀번호가 서로 다르면 메세지를 띄워줘야한다', async () => {
    // NOTE v-if가 제대로 테스트가 안됬음. 해결책 https://github.com/vuejs/vue-test-utils/issues/1384
    expect(wp.find('.error__password--input').exists()).toBe(false);

    let wrongPwd = '12345';
    wp.find('.password').setValue(PASSWORD);
    wp.find('.password_re').setValue(wrongPwd);
    await wp.vm.$nextTick();

    expect(wp.find('.error__password--input').exists()).toBe(true);
    let res = wp.find('.error__password--input').text();
    expect(res).toBe('패스워드가 맞지 않습니다.');
  });

  it('비밀번호 체크는 실시간으로 되야한다', () => {
    let wrongPwd = '12345';
    wp.find('.password').setValue(PASSWORD);
    wp.find('.password_re').setValue(wrongPwd);
    expect(wp.vm.isPasswordSame).toBe(false);

    wp.find('.password').setValue(PASSWORD);
    wp.find('.password_re').setValue(PASSWORD);
    expect(wp.vm.isPasswordSame).toBe(true);
  });

  const emailDuplciateState = [
    [200, false],
    [202, true],
  ];
  it.each(emailDuplciateState)(
    '이메일 중복 검사 성공 / 실패 안내 문구 ',
    async (code, expected) => {
      let getters = {
        apiStatus: () => {
          return {
            code: code,
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
      await expect(wp.find('.error__email--duplicated').exists()).toBe(
        expected
      );
    }
  );

  it('data를 담고 버튼을 클릭하면 data가 전송된다', async () => {
    wp.find('.email').setValue(EMAIL);
    wp.find('.password').setValue(PASSWORD);
    wp.find('.nickname').setValue(NICKNAME);

    wp.find('.userRegister').trigger('click');

    let data = {
      email: EMAIL,
      password: PASSWORD,
      nickname: NICKNAME,
    };
    await flushPromises();

    let url = getUrlFromSpy(spyPost);
    let body = getDataFromSpy(spyPost);

    expect(url).toBe(api_register_user);
    expect(body).toEqual({ data: data });
  });
});
