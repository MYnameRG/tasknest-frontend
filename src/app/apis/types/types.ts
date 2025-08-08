export interface APIProvider {
  get?: (url: string, options?: any) => Promise<any>;
  post?: (url: string, data?: any, options?: any) => Promise<any>;
  put?: (url: string, data?: any, options?: any) => Promise<any>;
  delete?: (url: string, options?: any) => Promise<any>;
  query?: (query: string, data?: any) => Promise<any>;
}