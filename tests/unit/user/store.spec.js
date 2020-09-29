import { userStore as store } from '@/store/modules/users';
import { REGISTER_USER } from '@/store/modules/types';

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
  });
});
