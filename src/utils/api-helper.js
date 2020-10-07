import { customError } from '@/utils/errors/custom-error';

const inspectResponse = (response) => {
  if (response.status_code != 200) {
    throw new customError(
      'Something went wrong',
      response.status_code,
      `code ${response.status_code}, error msg : ${response.msg}`
    );
  }
};
export { inspectResponse };
