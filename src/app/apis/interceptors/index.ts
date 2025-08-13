import requestHandler from "./request/request-handler";
import responseHandler from "./response/response-handler";
import request from "../providers/rest/axios";

request.interceptors.request = requestHandler;
request.interceptors.response = responseHandler;

export default request;