import { shallowMount, createLocalVue } from '@vue/test-utils';
import Button from '@/components/button/ButtonClick.vue';
import { customCounter as counterStore } from '@/store/button/counter';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Button 컴포넌트', () => {
  let store;
  let wp;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        CUSTOM: counterStore,
      },
    });
    wp = shallowMount(Button, { store, localVue });
  });
  it('렌더가 제대로 되는가, snapshot', () => {
    expect(wp.html()).toMatchSnapshot();
  });

  it('버튼이 제대로 있는가', () => {
    const btn = wp.find('.btn');
    const letter = 'Click ME';
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe(letter);
  });

  it('computed는 제대로 목킹 되는가', () => {
    expect(store.state.CUSTOM.counter).toEqual(0);
    const counterDiv = wp.find('.counter');
    console.log(counterDiv.text());
    expect(counterDiv.text()).toBe('0');
  });

  it('button을 클릭하면 counter는 증가되어야한다,', () => {
    const btn = wp.find('.btn');
    btn.trigger('click');
    expect(store.state.CUSTOM.counter).toEqual(1);
  });
});
