import { userStore as store } from '@/store/modules/users';
import { SET_USER_API_STATUS } from '@/store/modules/users-type';
import mockAxios from 'axios';
import { getUrlFromSpy } from '../../test-helper.js';

describe('User와 관련된 모든 store', () => {
  const status = {
    status_code: 200,
    msg: 'im in mock',
  };
  beforeEach(() => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: status })
    );
  });
  it('등록 api는 성공할 경우와 실패할 경우를 구분 지어야 한다', async () => {
    let commit = jest.fn();
    let data = {
      username: 'test',
      password: 'pwd',
      nickName: 'nick',
    };
    const spyPost = jest.spyOn(mockAxios, 'post');
    await store.actions.REGISTER_USER({ commit }, data);
    let url = getUrlFromSpy(spyPost);
    expect(spyPost).toBeCalledTimes(1);
    // expect(spyPost).toBeCalledWith(`/api/user/v1`);
    expect(url).toEqual('/api/users/v1');
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, status);
  });
});
