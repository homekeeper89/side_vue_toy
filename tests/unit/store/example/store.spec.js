import { exampleStore as store } from '@/store/modules/example';

describe('example store test', () => {
  it('counter의 기본값은 0이 되어야한다', () => {
    expect(store.state.counter).toEqual(0);
  });

  it('getters는 state의 counter를 가져온다', () => {
    const state = {
      counter: 0,
    };
    expect(store.getters.GET_COUNTER(state)).toEqual(state.counter);
  });
});
