

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdNotifications } from "react-icons/io";
import io from 'socket.io-client';

// Connect to the backend WebSocket server
const socket = io('http://localhost:8000');

axios.defaults.withCredentials = true;

const AdminHome = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [newUserEmails, setNewUserEmails] = useState([]);
    const runEvent = () => {
        const socket = io("http://localhost:8000");
        socket.emit("new_user_login", { message: "User has Logged In" });
      };
      

    useEffect(() => {
      // Confirm connection
      console.log('Connecting to the WebSocket server...');
      socket.on('connect', () => {
          console.log('successfully Connected to WebSocket server');
      });

      socket.on("new_user_login", (data) => {
        console.log("frontend result")
        alert(data.message)
      });


       // Listen for the new_user_register event
       socket.on("new_user_register", (data) => {
        console.log("Frontend received register event");
        setNotificationCount(prevCount => prevCount + 1);
        setNewUserEmails(prevEmails => [...prevEmails, data.message]);
        // alert(data.message);
    });
 
      return () => {
          socket.disconnect();
      };
  }, []);
  

  const handleNotificationClick = () => {
    alert(`New users:\n${newUserEmails.join('\n')}`);
    setNotificationCount(0); // Reset count after viewing
    setNewUserEmails([]); // Clear the email list after viewing
};

console.log("newUserEmails",newUserEmails)


    return (
        <>
            <div className='p-2 text-right relative'>
                <IoMdNotifications 
                    className='text-[34px] cursor-pointer' 
                    onClick={handleNotificationClick}
                />
                {notificationCount > 0 && (
                    <div className='bg-green-500 flex justify-center items-center h-[20px] w-[20px] rounded-full absolute top-2 left-7'>
                        {notificationCount}
                    </div>
                )}
            </div>

            <div>
                Admin Dashboard
            </div>

            <button onClick={() => runEvent()} className='bg-slate-400 p-2 cursor-pointer'>Click for real time events</button>
          
        </>
    );
};

export default AdminHome;
