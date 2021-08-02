import { Method } from 'axios';

export interface IRequestParameters {
  method?: Method;
  url: string;
  headers?: {};
  params?: {};
  data?: {};
}
