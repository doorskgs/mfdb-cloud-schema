import React from "react";
import { createRoot } from "react-dom/client";

import { createApiCaller } from "./model/saga/apiCaller";
import App from "./App";

//import * as bootstrap from 'bootstrap'


// @TODO: get cfg from env config
createApiCaller('http://localhost:10050/api/v1');

const root = createRoot(document.getElementById("root"));
root.render(<App />)
