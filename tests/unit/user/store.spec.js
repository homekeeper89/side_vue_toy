import { userStore as store } from '@/store/modules/users';
import { REGISTER_USER, SET_USER_API_STATUS } from '@/store/modules/types';

let url = '';
let body = {};

jest.mock('axios', () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      url = _url;
      body = _body;
      resolve(true);
    });
  },
}));

describe('User와 관련된 모든 store', () => {
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
    let status = {
      code: 200,
      msg: 'success',
    };
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, status);
  });

  it('apiStatus 변경 테스트', () => {
    let state = store.state;
    let status = {
      code: 200,
      msg: 'success',
    };
    store.mutations.SET_USER_API_STATUS(state, status);
    expect(state.apiStatus.code).toEqual(status.code);
    expect(state.apiStatus.msg).toEqual(status.msg);
  });
});
