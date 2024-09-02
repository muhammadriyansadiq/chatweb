import { useEffect, useState } from 'react'
import { Route ,useNavigation, RouterProvider, createBrowserRouter, createRoutesFromElements, BrowserRouter ,Routes, Navigate, useNavigate} from 'react-router-dom';
import Register from './pages/Register';
import './App.css'
import Login from './pages/Login';
import Forgetpassword from './pages/Forgetpassword';
import Forgetpasswordseted from './pages/Forgetpasswordseted';
import Changepassword from './pages/Changepassword';
import Home from './pages/Home';
import AdminHome from './pages/Adminhome';
import {jwtDecode} from 'jwt-decode';
import Userdashboard from './pages/Userdashboard.jsx';
import PublicRoute from './Utils/publicroute.jsx';
import ProtectedRoute from './Utils/ProtectedRoute.jsx';
import Chating from './pages/Chating.jsx';

// import MyProvider from './Utils/Provider.jsx';
// import ProtectRoute from './Utils/ProtectRoute.jsx';

function App() {
  // const navigate = useNavigate()
  const [role,setrole] = useState("")
  const[token,settoken] =useState("")
useEffect(()=>{
const token = localStorage.getItem("token")
settoken(token)
if(token){
const decoded = jwtDecode(token);
setrole(decoded.role)
}

},[])
console.log("roles",role)
  return (
    <>

<BrowserRouter > 
{/* <MyProvider> */}
<Routes>
{/* <Route path='/register' element={ token?<Home/> :< Register />} /> 
<Route path='/login' element={token?<Home /> :< Login />} />  */}
<Route path='/forgetpassword' element={  < Forgetpassword />} /> 
<Route path='/forgetpasswordseted/:token' element={  < Forgetpasswordseted />} /> 
<Route path='/changepassword' element={  < Changepassword />} /> 
<Route path='/chatting' element={  < Chating />} /> 

<Route path='/' element={  < Home />} /> 

{/* <Route element={<ProtectRoute role={['admin']} />}>

<Route path='/adminhome' element={  < AdminHome />} /> 
</Route> */}

{/* <Route path="/dashboard">
        {token ? (
          role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <AdminHome />
          )
        ) : (
          // navigate("/login")
          // <Redirect to="/login" />
          ""
        )}
      </Route> */}

{/* <Route 
          path='/register' 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        /> */}
<Route path='/register' element={  < Register />} /> 


        {/* <Route 
          path='/login' 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        /> */}
<Route path='/login' element={  < Login />} /> 



{/* <Route path='/dashboard' element={token?(role === "admin"?  < AdminHome />:<Userdashboard />):(<Login />)} />  */}
 {/* Protected Route for Admin */}
 {/* <Route
          path='/admindashboard'
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        /> */}

<Route path='/admindashboard' element={  < AdminHome />} /> 


        {/* Protected Route for User */}
        <Route
          path='/userdashboard'
          element={
            <ProtectedRoute requiredRole="user">
              <Userdashboard />
            </ProtectedRoute>
          }
        />
</Routes>
{/* </MyProvider> */}
</BrowserRouter>
    </>
  )
}

export default App
