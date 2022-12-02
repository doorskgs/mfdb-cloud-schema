import React from "react";
import { createRoot } from "react-dom/client";
import Routing from "./Routing";
import * as bootstrap from 'bootstrap'

const container = document.getElementById("root");

const root = createRoot(container);
root.render(<Routing />);
