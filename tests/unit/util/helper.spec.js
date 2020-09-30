import { inspectResponse } from '@/utils/apiHelper';
import { CustomError } from '@/utils/errors/CustomError';

describe('Helper 테스트 모아두는 곳', () => {
  it('response에 따라서 서로 다른 error를 만들어내야한다.', () => {
    let response = { status_code: 400, msg: 'hello_world' };
    expect(() => {
      inspectResponse(response);
    }).toThrow('some explain');
    expect(() => {
      inspectResponse(response);
    }).toThrow(CustomError);
  });
});
