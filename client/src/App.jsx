import './App.css'
import {Routes, Route} from "react-router-dom";
import LoginForm from "./_auth/forms/LoginForm.jsx";
import SignupForm from "./_auth/forms/SignupForm.jsx";
import Home from "./_root/pages/Home.jsx";
import AuthLayout from "./_auth/AuthLayout.jsx";
import RootLayout from "./_root/RootLayout.jsx";
import UsersList from "./_root/pages/UsersList.jsx";
import LogOut from "./_auth/LogOut.jsx";

function App() {
  return (
      <>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout/>}>
            <Route path="/sign-up" element={<SignupForm/>}/>
            <Route path="/sign-in" element={<LoginForm/>}/>
            <Route path="/log-out" element={<LogOut/>}/>
          </Route>

          {/* private routes */}
          <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/users" element={<UsersList/>}/>
          </Route>
        </Routes>
      </>
  )
}

export default App
