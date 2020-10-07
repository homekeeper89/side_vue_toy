// https://medium.com/@Dongmin_Jang/javascript-%EC%97%90%EB%9F%AC-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EB%B2%95-e6cecca61974
export class customError extends Error {
  constructor(code = 'GENERIC', status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, customError);
    }

    this.code = code;
    this.status = status;
  }
}
