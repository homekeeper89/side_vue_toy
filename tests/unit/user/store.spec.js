import { userStore as store } from '@/store/modules/users';
import { REGISTER_USER, SET_USER_API_STATUS } from '@/store/modules/types';

//https://stackoverflow.com/questions/58934628/how-can-i-mock-axios-api-calls-with-using-jest
let url = '';
let body = {};
let mockError = false;
let mockResolve = true;
jest.mock('axios', () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError) {
        throw Error;
      }
      url = _url;
      body = _body;
      resolve(mockResolve);
    });
  },
}));

const mockAPIFactory = (data) => {
  return jest.fn().mockImplementationOnce(() => {
    Promise.resolve(data);
  });
};

describe('User와 관련된 모든 store', () => {
  const status = {
    code: 200,
    msg: 'success',
  };
  it('등록 api는 성공할 경우와 실패할 경우를 구분 지어야 한다', async () => {
    let commit = jest.fn();
    let data = {
      username: 'test',
      password: 'pwd',
      nickName: 'nick',
    };
    await store.actions.REGISTER_USER({ commit, data });
    expect(url).toBe('/api/v1/user');
    expect(body).toEqual({ data });
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, true);
  });

  it('apiStatus 변경 테스트', () => {
    let state = store.state;
    store.mutations.SET_USER_API_STATUS(state, status);
    expect(state.apiStatus.code).toEqual(status.code);
    expect(state.apiStatus.msg).toEqual(status.msg);
  });
  it('catches an error', async () => {
    mockError = true;
    await expect(store.actions.REGISTER_USER(jest.fn(), {})).rejects.toThrow(
      'API Error occurred'
    );
  });
});
