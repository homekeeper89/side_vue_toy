import mockAxios from 'axios';
import { users as store } from '@/store/modules/users';
import { api_register_user, api_check_email } from '@/store/modules/users';
import { SET_USER_API_STATUS } from '@/store/modules/users-type';
import { getUrlFromSpy, getDataFromSpy } from '../../test-helper.js';

describe('User와 관련된 모든 store', () => {
  let status = {
    status_code: 200,
    msg: 'success',
  };
  let spyPost;
  beforeEach(() => {
    spyPost = jest.spyOn(mockAxios, 'post');
  });

  afterEach(() => {
    // jest.called가 리셋이 안되서 수정
    jest.clearAllMocks();
  });
  it('등록 api는 성공할 경우와 실패할 경우를 구분 지어야 한다', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: status })
    );
    let commit = jest.fn();
    let data = {
      email: 'test',
      password: 'pwd',
      nickname: 'nick',
    };

    await store.actions.REGISTER_USER({ commit }, data);

    let url = getUrlFromSpy(spyPost);
    let body = getDataFromSpy(spyPost);

    expect(spyPost).toBeCalledTimes(1);
    expect(url).toEqual(api_register_user);
    expect(body).toEqual({ data: data });
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, status);
  });

  it('등록 api가 실패할 경우', async () => {
    await expect(store.actions.REGISTER_USER(jest.fn(), {})).rejects.toThrow(
      'API Error occurred'
    );
    let url = getUrlFromSpy(spyPost);
    expect(url).toBe(api_register_user);
  });

  it('apiStatus 변경 테스트', () => {
    let status = {
      status_code: 404,
      msg: 'success',
    };
    let state = store.state;
    store.mutations.SET_USER_API_STATUS(state, status);
    expect(state.apiStatus.code).toEqual(status.status_code);
    expect(state.apiStatus.msg).toEqual(status.msg);
  });
  it.skip('catches an error', async () => {
    await expect(store.actions.REGISTER_USER(jest.fn(), {})).rejects.toThrow(
      'API Error occurred'
    );
  });

  it('이메일 중복 검사 실패시 error 상태에 저장 해야함', async () => {
    jest.clearAllMocks();
    let failStatus = {
      status_code: 205,
      msg: 'duplicated email id',
    };
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: failStatus })
    );
    let commit = jest.fn();
    let data = {
      email: 'test@email.com',
    };

    await expect(store.actions.CHECK_EMAIL({ commit }, data)).rejects.toThrow(
      'API Error occurred'
    );
    let url = getUrlFromSpy(spyPost);
    let body = getDataFromSpy(spyPost);

    expect(spyPost).toBeCalledTimes(1);
    expect(url).toEqual(api_check_email);
    expect(body).toEqual({ data: data });
  });

  it('api 상태가져온다', () => {
    let state = {
      apiStatus: {
        code: 200,
        msg: '',
      },
    };
    expect(store.getters.apiStatus(state).code).toEqual(200);
  });
});
