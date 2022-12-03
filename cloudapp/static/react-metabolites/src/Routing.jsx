import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { ConnectedRouter } from 'react-router-redux';

import IndexPage from "./Pages/IndexPage";
import BootstrapExamples from "./Pages/BootstrapExamples";
import MetaboliteView from "./Pages/MetaboliteView";
import NotFound from "./Pages/NotFound";

// @TODO: replace with Router middleware
export const Routing = () => <Fragment>
  {/* <ConnectedRouter history={history}> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="/bootstrap" element={<BootstrapExamples/>}/>
        <Route path="/metabolite/:mid" element={<MetaboliteView/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  {/* </ConnectedRouter> */}
</Fragment>;

export default Routing;
