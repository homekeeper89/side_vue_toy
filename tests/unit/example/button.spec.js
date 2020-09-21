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

  it('함수의 로직은 정상 작동 하는가', () => {
    const wrapper = shallowMount(ButtonPage);
    let res = wrapper.vm.doSomething(2);
    expect(res).toBe(true);
  });

  it('버튼의 함수가 제대로 호출 되는가', () => {
    const mockMethod = jest.spyOn(ButtonPage.methods, 'someMethod');
    const wrapper = shallowMount(ButtonPage);
    const btn = wrapper.find('.increment-btn');
    btn.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });

  it('버튼의 함수가 인자와 함께 호출 되는가', () => {
    const mockMethod = jest.spyOn(ButtonPage.methods, 'someMethod');
    const wrapper = shallowMount(ButtonPage);
    const btn = wrapper.find('.increment-btn');
    btn.trigger('click');
    expect(mockMethod).toBeCalledWith('name');
  });
});
