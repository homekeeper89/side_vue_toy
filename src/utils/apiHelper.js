import { CustomError } from '@/utils/errors/CustomError';

const inspectResponse = (response) => {
  if (response.status_code != 200) {
    throw new CustomError(
      'Something went wrong',
      response.status_code,
      `code ${response.status_code}, error msg : ${response.msg}`
    );
  }
};
export { inspectResponse };
