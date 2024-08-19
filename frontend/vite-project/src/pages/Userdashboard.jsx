import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import TodoList from '../components/TodoList';
axios.defaults.withCredentials = true;

const Userdashboard = () => {
    // const [auth, setAuth] = useState({
    //     text: "",
       
    //   });

//   const[load,setload] = useState(false)
// const [data,setdata] = useState([])
// async function handlesubmit(e){
//   e.preventDefault(); // Prevent the default form submission behavior
// try{

//   const response = await axios.post(`http://localhost:8000/api/userdashboard`, auth);
//   console.log("response",response)
// }
// catch(err){
//   console.log("err",err)
// }

//  }

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/userdashboard`);
//       console.log("response", response.data.payload);
//       setdata(response.data.payload)
//     } catch (err) {
//       console.log("err", err);
//     }
//   };

//   fetchData(); // Call the async function
// }, []);

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`https://dt.cybersecure11.com/api/customers`, {
//         withCredentials: true,
//       });      
//       console.log("response", response);
//       // setdata(response.data.payload)
//     } catch (err) {
//       console.log("err", err);
//     }
//   };

//   fetchData(); // Call the async function
// }, []);


  return (
    <>
    {/* <div>
        User Dashboard
    </div>
    <div>
      Todo List
    </div>
    <form onSubmit={handlesubmit}>
      <input
      onChange={(e) => setAuth({ ...auth, text: e.target.value })}

      type="text" placeholder='enter your todo' className='p-1 border-[1px] pl-2' />
      <button type='submit' className=' bg-slate-400 p-1'>Add</button>
    </form> */}

    <div>
    <TodoList />
      
    </div>
    </>
  );
};

export default Userdashboard;



