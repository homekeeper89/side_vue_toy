import { inspectResponse } from '@/utils/api-helper';
import { customError } from '@/utils/errors/custom-error';

describe('Helper 테스트 모아두는 곳', () => {
  it('response에 따라서 서로 다른 error를 만들어내야한다.', () => {
    let response = { status_code: 400, msg: 'hello_world' };
    expect(() => {
      inspectResponse(response);
    }).toThrow(`code ${response.status_code}, error msg : ${response.msg}`);
    expect(() => {
      inspectResponse(response);
    }).toThrow(customError);
  });
});
