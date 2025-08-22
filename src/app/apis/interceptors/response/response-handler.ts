import { processUser } from '../../../pre-processing/user.preprocess';
import localStorageService from '../../../services/local-storage.service';
import request from '../../providers/rest/axios';

request.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    console.log("Getting Response: ", response);
    if (response?.data?.token != null && response?.data?.token != '') {
        const preprocess = processUser(response?.data?.user);
        localStorageService.setItem("user", {
            ...preprocess,
            token: response?.data?.token
        });
    }

    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
});

export default request.interceptors.response;