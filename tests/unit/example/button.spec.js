// tests/unit/example/button.spec.js
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ButtonPage from '@/components/example/ButtonPage';
import Vuex from 'vuex';
import { exampleStore } from '@/store/modules/example';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ButtonClick', () => {
  let wrapper;
  let mockSomeMethod;
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        exampleStore,
      },
    });
    mockSomeMethod = jest.spyOn(ButtonPage.methods, 'someMethod');
    wrapper = shallowMount(ButtonPage, { store, localVue });
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

  it('버튼의 함수가 인자와 함께 호출 되는가', () => {
    const btn = wrapper.find('.increment-btn');
    btn.trigger('click');
    expect(mockSomeMethod).toBeCalledWith('name');
  });

  it('버튼을 클릭하면 counter가 +1 증가되어야한다', () => {
    const btn = wrapper.find('.increment-btn');
    btn.trigger('click');
    expect(store.state.exampleStore.counter).toEqual(1);
  });
});
