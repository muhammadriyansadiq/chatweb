import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
const navigate = useNavigate()
const [role,setrole] = useState("")
    const [auth, setAuth] = useState({
        email: "",
        password: " ",
      });

  const[load,setload] = useState(false)

  const handleSubmit = async (e) => {
    setload(true)
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8000/api/login`, auth);
      console.log('login created successfully:', response.data.user);
      const token = response?.data?.user
localStorage.setItem("token",token)
if (token) {
  const decoded = jwtDecode(token);
  setrole(decoded?.role)
console.log("decoded",decoded)

}
      setload(false)
      alert("login successfully")
      navigate("/")

    } catch (error) {
      console.log('Error:', error);
      setload(false)

    }
  };


  return (
    <>
      <div className="text-center">Register Page</div>
      <form onSubmit={handleSubmit} className="w-full">
        
        <div className="text-center mt-3 flex flex-col justify-center items-center">
          <label htmlFor="email">Email</label>
          <input
                  onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                  type="email"
            required
            id="email"
            className="w-8/12 border-[2px]"
            placeholder="email"
          />
        </div>
        <div className="text-center mt-3 flex flex-col justify-center items-center">
          <label htmlFor="password">Password</label>
          <input
onChange={(e) =>
    setAuth({ ...auth, password: e.target.value })
  }            type="password"
            required
            id="password"
            className="w-8/12 border-[2px]"
            placeholder="Password"
          />
        </div>
    <div className='  w-8/12 ml-auto mr-auto mt-4 underline text-blue-400 cursor-pointer'>
    <Link to={'/forgetpassword'}>
        Forget Password
    </Link>
    </div>
       
        <div className="flex justify-center mt-7">
          <button type="submit" className="bg-green-300 p-2 rounded-lg">
            {load?"Loading...":"Submit"
            
          }
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;



