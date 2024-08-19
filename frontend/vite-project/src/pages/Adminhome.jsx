import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

const AdminHome = () => {
    const [auth, setAuth] = useState({
        email: "",
        password: " ",
      });

  const[load,setload] = useState(false)

 

  return (
    <>
    <div>
        Admin Dashboard
    </div>
    </>
  );
};

export default AdminHome;



