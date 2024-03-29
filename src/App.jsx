import { useState } from 'react'
import image from "./assets/railimage.jpg"; 
import Navbar from './Components/Navbar'
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home';
import EmailVerification from './Components/EmailVerification';
import ForgetPassword from './Components/ForgetPassword';
import ConfirmPassword from './Components/ConfirmPassword';
import { Route, Routes } from 'react-router-dom';
function App() {
  return(
    <>
     <Navbar/>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/emailverification" element={<EmailVerification/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/confirmpassword" element={<ConfirmPassword/>}/>
     </Routes>
    </>
  )
  
}

export default App
