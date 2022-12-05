import {HttpApi} from "../utils/httpapi";

let api;

export function createApiCaller(url, at) {
  api = new HttpApi(url, at);
}

export function setToken(tk) {
  api.access_token = tk;
}

export function getApiCaller(group) {
  // @TODO: refactor to use api
  return api.request.bind(api);

  // return fetch(api.base_url+'/'+group, {
  //   method: 'GET',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   }
  // }).then(response => response.json())
  //   .catch((error) => {throw error})
}