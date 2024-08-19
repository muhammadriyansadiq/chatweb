import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Forgetpassword = () => {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
   async function handlesubmit(e){
    setLoading(true)
    
e.preventDefault()
   try {
      const response = await axios.post(`http://localhost:8000/api/forgetpassword`, {email});
      console.log('forget email send successfully',response);
      alert("successfully link send on your email")
      setLoading(false)

    } catch (error) {
      console.log('Error:', error);
      setLoading(false)

    }

    }

  return (
    <>
    
    <form className=' flex flex-col w-full justify-center items-center mt-4' onSubmit={handlesubmit}>
   <label htmlFor="email">Email:</label>
   <input
    onChange={(e) => setEmail(e.target.value)}

   type="text" id='email' placeholder='send your email for new password' className=' w-11/12 pl-2 py-2 border-[2px] rounded-lg' />   
   <button type='submit' className=' mt-1 bg-green-500 p-2 rounded-lg text-white'>
    {
      loading?"Loading...":"Submit"
    }    
    </button>  
   </form></>
  );
};

export default Forgetpassword;



