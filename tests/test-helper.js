const getUrlFromSpy = (spy) => {
  return spy.mock.calls[0][0];
};

export { getUrlFromSpy };
