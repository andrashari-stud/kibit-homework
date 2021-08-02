import { AxiosResponse } from 'axios';
import { getApiResponse } from './request';

describe('Request util', () => {
  it('should be defined', () => {
    expect(getApiResponse).toBeDefined();
  });

  it('should return valid mock', async () => {
    const res: AxiosResponse = await getApiResponse({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    });
    expect(res.data).toMatchObject({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });
});
