import { customCounter as store } from '@/store/button/counter';
const state = {
  counter: 0,
};
describe('Test Button Actions', () => {
  it('test state', () => {
    expect(store.state.counter).toEqual(0);
  });

  it('test getters', () => {
    expect(store.getters.GET_COUNTER(state)).toEqual(0);
  });

  it('actions', () => {
    const commit = jest.fn();
    store.actions.SET_COUNTER({ commit });
    expect(commit).toHaveBeenCalledWith('SET_COUNTER');
  });
});
