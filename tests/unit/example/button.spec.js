// tests/unit/example/button.spec.js
import { shallowMount } from '@vue/test-utils';
import ButtonPage from '@/components/example/ButtonPage';

describe('ButtonClick', () => {
  it('Page 스냅샷을 찍자', () => {
    const wrapper = shallowMount(ButtonPage);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('기본 영역을 확인하자 : 숫자 나오는 부분', () => {
    const wrapper = shallowMount(ButtonPage);
    const count = wrapper.find('.count-area').text();
    expect(count).toBe('0');
  });

  it('기본 영역을 확인하자 : 버튼 렌더 부분', () => {
    const wrapper = shallowMount(ButtonPage);
    const btn = wrapper.find('.increment-btn');
    expect(btn.text()).toBe('Click Me');
  });
});
