import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Navbar from "./pages/Nav";
import CreateForm from "./pages/Form";

import Regform from "./pages/regForm";
import Loginform from "./pages/LoginForm";
import Profile from "./pages/myprofile/Profile.js";
import Comments from "./pages/comments";

import { useLocation } from 'react-router-dom';
import RenderNavbar from "./pages/conditionalRendering/RenderNavBar";
import ProfileSetUP from "./pages/myprofile/ProfileSetUp.js";
import CommentsComments from "./pages/CommentsComments";
import Likes from "./pages/myprofile/Like";
import Logoutpage from "./pages/logoutpage";
import Endtoend from "./pages/DirectMessages/endtoend.js";
import { Conversation } from "./pages/DirectMessages/conversation.js";
import { TheChat } from "./pages/DirectMessages/Thechat.js";


function App() {
 
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
element = {<Home />}
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
path="/profile/:_id"
element={<Profile />}

/>
<Route 
path="/comments/:_id"
element={<Comments/>}

/>
<Route 
path="/directmessage/"
element={<Endtoend/>}

/>


<Route 
path="profile/profilesetup/:_id"
element={<ProfileSetUP/>}

/>

<Route 
path="/comments/:_id/commentscomments/:_id"
element={<CommentsComments/>}

/>
<Route 
path="/profile/likes/:_id"
element={<Likes/>}

/>


<Route 
path="/profile/:_id/directmessage/:userA/:userB"
element={<Endtoend/>}

/>
<Route 
path="/conversation"
element={<Conversation/>}

/>
<Route 
path="/thechat"
element={<TheChat/>}

/>
    </Routes>


  </div>
    
    
    </BrowserRouter>

   </div>
   
   
   </>
  );
}

export default App;



