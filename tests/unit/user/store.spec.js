import { userStore as store } from '@/store/modules/users';
import { REGISTER_USER, SET_USER_API_STATUS } from '@/store/modules/types';

//https://stackoverflow.com/questions/58934628/how-can-i-mock-axios-api-calls-with-using-jest
let url = '';
let body = {};
let mockError = false;
let mockResolve = true;
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

describe('User와 관련된 모든 store', () => {
  const status = {
    status_code: 200,
    msg: 'success',
  };
  it('등록 api는 성공할 경우와 실패할 경우를 구분 지어야 한다', async () => {
    let commit = jest.fn();
    let data = {
      username: 'test',
      password: 'pwd',
      nickName: 'nick',
    };
    mockResolve = status;
    await store.actions.REGISTER_USER({ commit, data });
    expect(url).toBe('/api/v1/user');
    expect(body).toEqual({ data });
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, mockResolve);
  });

  it('등록 api가 실패할 경우', async () => {
    mockResolve = status;
    mockResolve.status_code = 400;
    await expect(store.actions.REGISTER_USER(jest.fn(), {})).rejects.toThrow(
      'API Error occurred'
    );
    expect(url).toBe('/api/v1/user');
  });

  it('apiStatus 변경 테스트', () => {
    let state = store.state;
    store.mutations.SET_USER_API_STATUS(state, status);
    expect(state.apiStatus.code).toEqual(status.status_code);
    expect(state.apiStatus.msg).toEqual(status.msg);
  });
  it('catches an error', async () => {
    mockError = true;
    await expect(store.actions.REGISTER_USER(jest.fn(), {})).rejects.toThrow(
      'API Error occurred'
    );
  });
});
