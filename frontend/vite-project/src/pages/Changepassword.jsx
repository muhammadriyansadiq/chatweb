import React from 'react';
import axios from 'axios';
import { useState } from 'react';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
const Changepassword = () => {
    const navigate = useNavigate()
const [load,Setload] =useState(false)
    const [auth, setAuth] = useState({
        currentpassword:"",
        newpassword: "",
        confirmpassword: " ",
      });
   async function handlesubmit(e){
    Setload(true)
e.preventDefault()
   try {
      const response = await axios.post(`http://localhost:8000/api/changepassword`, auth);

alert(response.data.msg)
console.log(response)
    Setload(false)
navigate("/login")

    } catch (error) {

        alert(error.response.data.msg)
      console.log("error",error)
      Setload(false)
    }

    }

  return (
    <>
    <div>
    <form action="" className=' flex flex-col justify-between items-center w-full  h-[20vh]' onSubmit={handlesubmit}>
    <div className=' p-2 flex flex-col'>
            <label htmlFor="newpassword">Current Password</label>
            <input
            onChange={(e) => setAuth({ ...auth, currentpassword: e.target.value })}

            id='newpassword' className=' border-[2px]' type="password" placeholder='Enter New Password' />
        </div>
        <div className=' p-2 flex flex-col'>
            <label htmlFor="newpassword">New Password</label>
            <input
            onChange={(e) => setAuth({ ...auth, newpassword: e.target.value })}

            id='newpassword' className=' border-[2px]' type="password" placeholder='Enter New Password' />
        </div>
        <div className=' p-2 flex flex-col'>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
                    onChange={(e) => setAuth({ ...auth, confirmpassword: e.target.value })}

        id="confoirmpassword" className=' border-[2px]' type="password" placeholder='Enter confirm Password' />
        </div>
        <div className=' mt-2 flex justify-center'>
            <button type='submit' className=' bg-slate-400 text-white cursor-pointer p-2 rounded-lg'>
                {load?"Loading...":"Submit"}
                </button>
        </div>
    </form>
    </div>
    </>
  );
};

export default Changepassword;



