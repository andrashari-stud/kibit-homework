import axios, { AxiosResponse } from 'axios';
import { RequestParameters } from '../models/request';

export const getApiResponse = async ({
  method = 'get',
  url,
  headers = {},
  params = {},
  data = {},
}: RequestParameters): Promise<AxiosResponse | null> => {
  // console.log(`----------------------`);
  // console.log( url, headers);
  const urlWithQueryParams = url + concatQueryParams(params);
  // console.log(urlWithQueryParams, 'concatQueryParams');
  try {
    const res = await axios({ method, url: urlWithQueryParams, headers, data });
    return res;
  } catch (e) {
    throw new Error(`Couldn't call API, message: ${e.message}`);
  }
};

const concatQueryParams = (data: {}) => {
  const params = [];
  for (const d in data) {
    if (!!data[d]) {
      params.push(d + '=' + data[d]);
    }
  }
  return '?' + params.join('&');
};
