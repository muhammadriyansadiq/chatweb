import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null, // Initialize photo as null
  });

  const[load,setload] = useState(false)

  const handleSubmit = async (e) => {
    setload(true)
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('photo', formData.photo);

    try {
      const response = await axios.post(`http://localhost:8000/api/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Register created successfully:', response);
      setload(false)
      alert("signup suceessfully")
      navigate('/login')

    } catch (error) {
      
      console.log('Error:', error);
      alert("signup error")
      setload(false)

    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  return (
    <>
      <div className="text-center">Register Page</div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="text-center mt-3 flex flex-col justify-center items-center">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            id="name"
            className="w-8/12 border-[2px]"
            placeholder="Name"
          />
        </div>
        <div className="text-center mt-3 flex flex-col justify-center items-center">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password"
            required
            id="password"
            className="w-8/12 border-[2px]"
            placeholder="Password"
          />
        </div>
        <div className="text-center mt-3 flex flex-col justify-center items-center">
          <label htmlFor="file">File</label>
          <input
            onChange={handleFileChange}
            type="file"
            id="file"
            className="border-[2px] w-8/12"
          />
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

export default Register;
