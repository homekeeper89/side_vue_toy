import { userStore as store } from '@/store/modules/users';
import { SET_USER_API_STATUS } from '@/store/modules/users-type';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('User와 관련된 모든 store', () => {
  const status = {
    status_code: 200,
    msg: 'success',
  };
  let mockAxios;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });
  it('등록 api는 성공할 경우와 실패할 경우를 구분 지어야 한다', async () => {
    let commit = jest.fn();
    let data = {
      username: 'test',
      password: 'pwd',
      nickName: 'nick',
    };
    mockAxios.onPost('/api/users/v1').reply(200, status);
    let url = mockAxios.handlers.post[0][0];
    await store.actions.testActions({ commit }, data);
    let body = mockAxios.history.post[0].data; // jsonfiy 해야함
    expect(url).toBe('/api/users/v1');
    expect(body).toEqual(JSON.stringify({ data: data }));
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, status);
  });
});
