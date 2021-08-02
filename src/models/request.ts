import { Method } from 'axios';

export interface RequestParameters {
  method?: Method;
  url: string;
  headers?: {};
  params?: {};
  data?: {};
}
