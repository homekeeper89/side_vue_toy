import MockAdapter from 'axios-mock-adapter';
//https://stackoverflow.com/questions/55038758/how-to-work-with-path-parameters-in-axios-mock-adapter
export class MockAxiosHelper {
  constructor(axios) {
    this.mockAxios = new MockAdapter(axios);
  }

  getAxios() {
    return this.mockAxios;
  }

  getUrl(methods) {
    return this.mockAxios.handlers[methods][0][0];
  }

  getData(methods) {
    return this.mockAxios.history[methods][0].data;
  }
}
