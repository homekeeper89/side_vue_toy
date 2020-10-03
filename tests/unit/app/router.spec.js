import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import UserRegister from '@/components/user/UserRegister.vue';
import { userRoutes as routes } from '@/router/UserRoutes.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App', () => {
  it('라우팅이 정상으로 되는가', async () => {
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes,
    });
    const wrapper = mount(App, {
      localVue,
      router,
    });
    router.push('/registerUser');

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserRegister).exists()).toBe(true);
  });

  it('mock routing path', () => {
    const $route = {
      path: '/some/path',
    };
    const wrapper = shallowMount(UserRegister, {
      mocks: {
        $route,
      },
    });

    expect(wrapper.vm.$route.path).toEqual('/some/path');
  });

  it.skip('renders id param', () => {
    const wrapper = shallowMount(UserRegister, {
      mocks: {
        $route: {
          params: {
            msg: '유저 등록 화면',
          },
        },
      },
    });
    expect(wrapper.text()).toContain('123');
  });
});
