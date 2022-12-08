import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from './model/store'

import Navbar from "./components/SiteElements/Navbar";
import Notifications from "./components/SiteElements/Notifications";

import IndexPage from "./Pages/IndexPage";
import MetaboliteView from "./Pages/MetaboliteView";
import NotFound from "./Pages/NotFound";


// @TODO: replace with Router middleware
export const App = () => <Provider store={store}>
  <BrowserRouter>
    <Navbar />

    <Notifications />

    <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/metabolite/:mid" element={<MetaboliteView/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>

  </BrowserRouter>

</Provider>;

export default App;
