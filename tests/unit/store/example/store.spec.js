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

  it('counter의 값을 1 증가 시킨다', () => {
    const state = {
      counter: 0,
    };
    store.mutations.SET_COUNTER(state);
    expect(state.counter).toEqual(1);
  });

  it('actions시 mutation을 호출 해야한다', () => {
    const commit = jest.fn();
    store.actions.SET_COUNTER({ commit });
    expect(commit).toHaveBeenCalledWith('SET_COUNTER');
  });
});
