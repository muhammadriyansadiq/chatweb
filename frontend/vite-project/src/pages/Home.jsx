import React, { useEffect, useState } from 'react';
// import { useAuth } from '../Utils/Provider';
import { Link } from 'react-router-dom';

const Home = () => {
   const [rolestate, setrolestate] = useState(false);
   // const { user } = useAuth();

   // useEffect(() => {
   //    if (user?.role) {
   //       console.log('token', "admin".includes(user.role));
   //       setrolestate("admin".includes(user.role));
   //    }
   // }, []);

   // if (!user) {
   //    return <div>Loading...</div>;
   // }

   return (
      <>
         <div className='flex justify-around mt-2 w-[20%]'>
            <div className='cursor-pointer font-extrabold text-blue-700 hover:text-green-700'>
               <Link to={'/login'}
               >
               Login
               </Link>
               </div>
            <div className='cursor-pointer font-extrabold text-blue-700 hover:text-green-700'>   
               <Link to={'/register'}
               >
               Register
               </Link></div>
            <div className='cursor-pointer font-extrabold text-blue-700 hover:text-green-700'>
               {rolestate ? "Dashboard" : ""}
            </div>
         </div>
      </>
   );
};

// Make sure to export the component as default
export default Home;
