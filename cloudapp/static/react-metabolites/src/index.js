import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'

import { createApiCaller } from "./model/saga/apiCaller";
import { store } from './model/store'
import Routing from "./Routing";

import * as bootstrap from 'bootstrap'

// @TODO: get cfg from env config
createApiCaller('http://localhost:10050/api/v1');

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routing />
  </Provider>
)
