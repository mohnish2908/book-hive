import React from 'react'
import Membersidebar from '../components/Membersidebar'
import { useLocation } from 'react-router-dom';


const Members = () => {

  const location = useLocation();
  const { data } = location.state || {};
  console.log("data:", data);

  return (
    <div className='flex flex-row text-white'>
        <Membersidebar data={data}/>
        <div className='flex flex-col items-center p-8 bg-gray-800 rounded-lg shadow-lg w-3/4 translate-y-[30%] translate-x-[-5%]'>
        <h1 className='text-3xl font-bold mb-4'>Welcome, {data?.name}</h1>
        <p className='text-lg mb-2'>MemberId: {data.memberId}</p>
        <p className='text-lg mb-2'>Email: {data.email}</p>
        <p className='text-lg mb-2'>Contact Number: {data.contactNo}</p>
      </div>
        
    </div>
  )
}

export default Members
