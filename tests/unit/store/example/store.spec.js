import { exampleStore as store } from '@/store/modules/example';

describe('example store test', () => {
  it('counter의 기본값은 0이 되어야한다', () => {
    expect(store.state.counter).toEqual(0);
  });
});
