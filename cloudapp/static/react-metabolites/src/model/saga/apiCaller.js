import {HttpApi} from "../utils/httpapi";

const apis = {};

export function createApiCaller(url, at, key=null) {
  if (!key) key = 'default';
  const api = new HttpApi(url, at);
  apis[key] = api;
  return api;
}

export function setToken(tk) {
  api.access_token = tk;
}

export function getApiCaller(key=null) {
  if (!key)
    key = 'default';

  const api = apis[key];
  return api.request.bind(api);
}