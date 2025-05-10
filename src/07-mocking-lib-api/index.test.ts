import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const relativePath = '/users';
  const mockGetResponse = { data: 'mocked data' };
  const mockedGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedAxios.create.mockReturnValue({
      get: mockedGet,
    } as unknown as AxiosInstance);
    mockedGet.mockResolvedValue(mockGetResponse);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toBe(mockGetResponse.data);
  });
});
