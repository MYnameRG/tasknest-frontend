import type { InternalAxiosRequestConfig } from 'axios';
import { requestInterceptor } from '../providers/rest/axios';

requestInterceptor.use((config) => {
    // Do something before request is sent
    const cloneConfig = { ...config } as InternalAxiosRequestConfig<any>;
    const token = localStorage.getItem("token");
    if (token && token != '') {
        cloneConfig.withCredentials = true;
        cloneConfig.headers.Authorization = `Bearer ${token}`
    }

    console.log(cloneConfig);
    return cloneConfig;
}, (error) => {
    // Do something with request error
    console.log("Authorization Token Error: ", error);
    return Promise.reject(error);
},
    { synchronous: true, runWhen: () => true }
);