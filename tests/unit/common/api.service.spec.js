import { ApiService } from '@/common/api.service';

describe('API 관련 테스트', () => {
  beforeEach(() => {
    ApiService.init();
  });
  it('ApiService는 각 method가 존재해야한다', () => {
    let methods = ['post', 'get', 'put', 'delete'];
    let res = methods.filter(
      (method) => !Object.keys(ApiService).includes(method)
    );

    expect(res.length).toEqual(0);
  });
});
