import TopBar from "./Components/Topbar/TopBar";
import Settings from "./Pages/Settings/Settings";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ContactUs from "./Pages/ContactUs/ContactUs";
import About from "./Pages/About/About";

import React from "react";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user}=useContext(Context);
  return (
    <Router>
     <TopBar/>
     <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/register" element={user?<Home/>:<Register />}/>
          <Route path="/login" element={user?<Home/>:<Login />}/>
          <Route path="/write" element={user?<Write />:<Register/>}/>
          <Route path="/settings" element={user?<Settings />:<Register/>}/>
          <Route path="/post/:postId" element={<Single />}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/about" element={<About/>}/>

     </Routes>
    </Router>
    
  );
}

export default App;
