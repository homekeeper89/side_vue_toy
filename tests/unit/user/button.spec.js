import { shallowMount, createLocalVue } from '@vue/test-utils';
import Button from '@/components/button/ButtonClick.vue';
import { customCounter as counter } from '@/store/button/counter';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Button 컴포넌트', () => {
  const store = new Vuex.Store(counter);
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

  it('숫자가 나오는 곳이 있는가', () => {
    const mockCounter = jest.fn(() => 7);
    // const store = new Vuex.Store({
    //   getters: counter.getters,
    //   // getters: {
    //   //   // mock function
    //   //   'CUSTOM/GET_COUNTER': mockCounter,
    //   // },
    // });
    console.log(counter);
    console.log(counter.state['counter']);
    const wp = shallowMount(Button, {
      store,
      localVue,
    });
    const counterDiv = wp.find('.counter');
    expect(counterDiv.text()).toBe('7');
  });

  it.skip('숫자가 나오는 곳이 있는가', () => {
    const wp = shallowMount(Button, {
      mocks: {
        $store: store,
      },
      localVue,
    });
    const counterDiv = wp.find('.counter');
    expect(store.state.counter).toBe(7);
    expect(counterDiv.text()).toBe('0');
  });

  it('getter가 제대로 되는가', () => {
    const expectNum = 4;
    const state = {
      counter: expectNum,
    };
    expect(counter.getters.GET_COUNTER(state)).toEqual(expectNum);
  });
});
