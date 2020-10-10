import { userStore as store } from '@/store/modules/users';
import { SET_USER_API_STATUS } from '@/store/modules/users-type';
import mockAxios from 'axios';

describe('User와 관련된 모든 store', () => {
  const status = {
    status_code: 200,
    msg: 'success',
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

    await store.actions.REGISTER_USER({ commit }, data);

    // expect(url).toBe('/api/users/v1');
    // expect(body).toEqual(JSON.stringify({ data: data }));
    expect(commit).toHaveBeenCalledWith(SET_USER_API_STATUS, status);
  });

  it.skip('등록 api가 실패할 경우', async () => {
    await expect(store.actions.REGISTER_USER(jest.fn(), {})).rejects.toThrow(
      'API Error occurred'
    );
    expect(mockAxiosHelper.getUrl('post')).toBe('/api/users/v1');
  });

  it('apiStatus 변경 테스트', () => {
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
});
