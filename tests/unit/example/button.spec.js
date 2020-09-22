// tests/unit/example/button.spec.js
import { shallowMount } from '@vue/test-utils';
import ButtonPage from '@/components/example/ButtonPage';

describe('ButtonClick', () => {
  let wrapper;
  let mockSomeMethod;
  beforeEach(() => {
    mockSomeMethod = jest.spyOn(ButtonPage.methods, 'someMethod');
    wrapper = shallowMount(ButtonPage);
  });
  it('Page 스냅샷을 찍자', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('기본 영역을 확인하자 : 숫자 나오는 부분', () => {
    const count = wrapper.find('.count-area').text();
    expect(count).toBe('0');
  });

  it('기본 영역을 확인하자 : 버튼 렌더 부분', () => {
    const btn = wrapper.find('.increment-btn');
    expect(btn.text()).toBe('Click Me');
  });

  it('함수의 로직은 정상 작동 하는가', () => {
    let res = wrapper.vm.doSomething(2);
    expect(res).toBe(true);
  });

  it('버튼의 함수가 제대로 호출 되는가', () => {
    const btn = wrapper.find('.increment-btn');
    btn.trigger('click');
    expect(mockSomeMethod).toHaveBeenCalled();
  });

  it.skip('버튼의 함수가 인자와 함께 호출 되는가', () => {
    const btn = wp.find('.increment-btn');
    btn.trigger('click');
    expect(mockSomeMethod).toBeCalledWith('name');
  });
});
