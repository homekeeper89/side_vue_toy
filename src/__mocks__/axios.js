// src/__mocks__/axios.ts

const mockAxios = jest.genMockFromModule('axios');

// const mockAxios = {
//   get: jest.fn(() => Promise.resolve({ data: {} })),
//   post: jest.fn(() =>
//     Promise.resolve({ data: { status_code: 200, msg: 'im in mock' } })
//   ),
// };
// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
