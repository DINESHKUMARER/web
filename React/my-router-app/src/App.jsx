import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

import{BrowserRouter , Routes , Route , Link} from "react-router-dom";

 function App(){

  return(
  
  <BrowserRouter>

   <nav>
    <Link to="/" style={{marginRight:'15px'}}>Home</Link>

    <Link to="/about">About</Link>
   </nav>
  <Routes>

  {/*Path-Address of Different Pages */}
  <Route path="/"  element={<HomePage/>} />
  <Route path="/about" element={<AboutPage/>} />

  </Routes>

  </BrowserRouter>)

 }
 export default App;
