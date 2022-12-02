import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IndexPage from "./Pages/IndexPage";
import BootstrapExamples from "./Pages/BootstrapExamples";
import MetaboliteView from "./Pages/MetaboliteView";
import NotFound from "./Pages/NotFound";

export const Routing = () => <Fragment>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/bootstrap" element={<BootstrapExamples/>}/>
      <Route path="/metabolite/:mid" element={<MetaboliteView/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
</Fragment>;

export default Routing;
