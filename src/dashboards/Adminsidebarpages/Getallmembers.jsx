import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const Getallmembers = () => {
  const [members, setMembers] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};

  const fetchMembers = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/admin/getAllMembers');
      const result = await response.json();
      console.log(result.data);
      setMembers(result.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  return (
    <div className='text-white flex'>
      <div><Adminsidebar /></div>
      <div className='flex-1 p-4'>
        <button 
          onClick={fetchMembers} 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Get All Members
        </button>
        <div className='mt-4'>
          {members.length > 0 ? (
            <ul className='space-y-4'>
              {members.map((member, index) => (
                <li key={index} className='bg-gray-800 p-4 rounded'>
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>Address:</strong> {member.address}</p>
                  <p><strong>Admin ID:</strong> {member.adminId}</p>
                  <p><strong>Contact No:</strong> {member.contactNo}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Gender:</strong> {member.gender}</p>
                  <p><strong>Active:</strong> {member.isActive ? 'Yes' : 'No'}</p>
                  <p><strong>Member ID:</strong> {member.memberId}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No members found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Getallmembers;
