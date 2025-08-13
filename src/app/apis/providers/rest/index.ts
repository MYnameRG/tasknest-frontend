import type { APIProvider } from '../../types/types';
import request from '../../interceptors/index';

export const RESTAPIProvider: APIProvider = {
  get: (url, options) => request.get(url, options).catch(err => {
    throw err
  }),
  post: (url, data, options) => request.post(url, data, options).catch(err => {
    throw err
  }),
  put: (url, data, options) => request.put(url, data, options).catch(err => {
    throw err
  }),
  delete: (url, options) => request.delete(url, options).catch(err => {
    throw err
  })
};