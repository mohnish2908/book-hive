import React from 'react';
import { useLocation } from 'react-router-dom';
import Adminsidebar from '../components/Adminsidebar';

const Admin = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className='flex flex-row min-h-screen bg-gray-900 text-white'>
      <div className='w-1/4'>
        <Adminsidebar data={data} />
      </div>
      <div className='flex flex-col items-center p-8 bg-gray-800 rounded-lg shadow-lg w-3/4 translate-y-[30%] translate-x-[-5%]'>
        <h1 className='text-3xl font-bold mb-4'>Welcome, {data?.name}</h1>
        <p className='text-lg mb-2'>AdminId: {data.adminId}</p>
        <p className='text-lg mb-2'>Email: {data.email}</p>
        <p className='text-lg mb-2'>Contact Number: {data.contactNo}</p>
      </div>
    </div>
  );
};

export default Admin;
