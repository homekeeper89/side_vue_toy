const getUrlFromSpy = (spy) => {
  return spy.mock.calls[0][0];
};

const getDataFromSpy = (spy) => {
  return spy.mock.calls[0][1];
};

export { getUrlFromSpy, getDataFromSpy };
