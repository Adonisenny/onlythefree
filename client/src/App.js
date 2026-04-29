import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Navbar from "./pages/Nav";
import CreateForm from "./pages/Form";

import Regform from "./pages/regForm";
import Loginform from "./pages/LoginForm";
import { useContext } from "react";
import { AuthContext } from "./Context/authcontext";
import Comments from "./pages/comments";


import RenderNavbar from "./pages/conditionalRendering/RenderNavBar";


import Likes from "./pages/myprofile/Like";
import Logoutpage from "./pages/logoutpage";




function App() {
  const {user} = useContext(AuthContext)
  return (
   <>
   <div>
  
   <BrowserRouter>
    <RenderNavbar>
   <Navbar /> 
   </RenderNavbar>
  <div className="pages">
    <Routes>
<Route 
path="/"
element = {user ? <Home /> : <Loginform />}
/>

<Route 
path="/form"
element = {<CreateForm />}
/>
<Route 
path="/registration"
element = {<Regform />}
/>
<Route 
path="/login"
element = {<Loginform />}
/>
<Route 
path="/logout"
element = {<Logoutpage />}
/>

<Route 
path="/comments/:_id"
element={<Comments/>}

/>

<Route 
path="/profile/likes/:_id"
element={<Likes/>}

/>



    </Routes>


  </div>
    
    
    </BrowserRouter>

   </div>
   
   
   </>
  );
}

export default App;



