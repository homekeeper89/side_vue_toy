import { userStore as store } from '@/store/modules/users';
import { SET_USER_API_STATUS } from '@/store/modules/users-type';
import { MockAxiosHelper } from '@/utils/test-helper';
import axios from 'axios';

describe('User와 관련된 모든 store', () => {
  const status = {
    status_code: 200,
    msg: 'success',
  };
  let mockAxios;
  let mockAxiosHelper;
  beforeEach(() => {
    mockAxiosHelper = new MockAxiosHelper(axios);
    mockAxios = mockAxiosHelper.getAxios();
  });
  it('등록 api는 성공할 경우와 실패할 경우를 구분 지어야 한다', async () => {
    let commit = jest.fn();
    let data = {
      username: 'test',
      password: 'pwd',
      nickName: 'nick',
    };

    mockAxios.onPost('/api/users/v1').reply(200, status);
    await store.actions.testActions({ commit }, data);

    let url = mockAxiosHelper.getUrl('post');
    let body = mockAxiosHelper.getData('post'); // jsonfiy 해야함
    expect(url).toBe('/api/users/v1');
    expect(body).toEqual(JSON.stringify({ data: data }));
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, status);
  });
});
