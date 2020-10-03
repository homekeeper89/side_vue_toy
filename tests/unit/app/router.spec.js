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
});
