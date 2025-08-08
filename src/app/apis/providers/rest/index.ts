import type { APIProvider } from '../../types/types';
import { request } from './axios';

export const RESTAPIProvider: APIProvider = {
  get: (url, options) => request.get(url, options),
  post: (url, data, options) => request.post(url, data, options),
  put: (url, data, options) => request.put(url, data, options),
  delete: (url, options) => request.delete(url, options)
};