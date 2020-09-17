import { shallowMount, createLocalVue } from '@vue/test-utils';
import Button from '@/components/button/ButtonClick.vue';
import { customCounter as counterStore } from '@/store/button/counter';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Button 컴포넌트', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        CUSTOM: counterStore,
      },
    });
  });
  it('렌더가 제대로 되는가, snapshot', () => {
    const wp = shallowMount(Button, {
      store,
      localVue,
    });
    expect(wp.html()).toMatchSnapshot();
  });

  it('버튼이 제대로 있는가', () => {
    const wp = shallowMount(Button, {
      store,
      localVue,
    });
    const btn = wp.find('.btn');
    const letter = 'Click ME';
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe(letter);
  });

  it('computed는 제대로 목킹 되는가', () => {
    const wp = shallowMount(Button, {
      store,
      localVue,
    });
    expect(store.state.CUSTOM.counter).toEqual(7);
    const counterDiv = wp.find('.counter');
    console.log(counterDiv.text());
    expect(counterDiv.text()).toBe('7');
  });

  it.skip('getter가 제대로 되는가', () => {
    const expectNum = 4;
    const state = {
      counter: expectNum,
    };
    expect(counter.getters.GET_COUNTER(state)).toEqual(expectNum);
  });
});
