import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'

import Routing from "./Routing";
import { store } from './model/store'

import * as bootstrap from 'bootstrap'

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routing />
  </Provider>
)
