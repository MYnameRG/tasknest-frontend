import { responseInterceptor } from '../providers/rest/axios';

responseInterceptor.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Getting Response: ", response)
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Getting Response Error: ", error);
    return Promise.reject(error);
});