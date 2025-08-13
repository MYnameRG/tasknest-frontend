import type { InternalAxiosRequestConfig } from 'axios';
import request from '../../providers/rest/axios';
import localStorageService from '../../../services/local-storage.service';
import type { User } from '../../../models/User.model';

request.interceptors.request.use((config) => {
    // Do something before request is sent
    const cloneConfig = { ...config } as InternalAxiosRequestConfig<any>;

    const user = localStorageService.getItem<User>("user");
    if (user == null) {
        throw new Error("User's session is expired");
    }

    if (user?.token == null || user?.token == '') {
        throw new Error("Token is empty");
    }

    cloneConfig.headers.set('Authorization', `Bearer ${user?.token}`);
    return cloneConfig;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
},
    {
        synchronous: true, runWhen: () => {
            const user = localStorageService.getItem<User>("user");
            if (user == null) {
                return false;
            }

            return true;
        }
    }
);

export default request.interceptors.request;