import { shallowMount } from '@vue/test-utils';
import Button from '@/components/button/ButtonClick.vue';
import { customCounter as counter } from '@/store/button/counter';

describe('Button 컴포넌트', () => {
  it('렌더가 제대로 되는가, snapshot', () => {
    const wp = shallowMount(Button);
    expect(wp.html()).toMatchSnapshot();
  });

  it('버튼이 제대로 있는가', () => {
    const wp = shallowMount(Button);
    const btn = wp.find('.btn');
    const letter = 'Click ME';
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe(letter);
  });

  it('숫자가 나오는 곳이 있는가', () => {
    const wp = shallowMount(Button);
    const counterDiv = wp.find('.counter');
    expect(counterDiv.text()).toBe('0');
  });

  it('getter가 제대로 되는가', () => {
    const expectNum = 0;
    const state = {
      counter: expectNum,
    };
    expect(counter.getters.GET_COUNTER(state)).toEqual(expectNum);
  });
});
