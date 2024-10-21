import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const Addmember = ({ adminId }) => {
  const [members, setMembers] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/getAllMemberRequest');
      const result = await response.json();
      console.log(result);
      setMembers(result.data); // Extracting the data array
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleApprove = async (registrationId) => {
    try {
      console.log(registrationId,data.adminId);
      const response = await fetch(`http://localhost:8080/admin/${data.adminId}/approveMember/${registrationId}`, {
        method: 'POST',
        body: null,
      });
      console.log(response.json());
      if (response.ok) {
        console.log('Approved member with id:', registrationId);
        // Optionally, you can refetch the members or update the state to reflect the changes
        fetchMembers();
      } else {
        console.error('Failed to approve member');
      }
    } catch (error) {
      console.error('Error approving member:', error);
    }
  };

  const handleReject = async (registrationId) => {
    try {
      console.log(registrationId,data.adminId);
      const response = await fetch(`http://localhost:8080/admin/rejectMember/${registrationId}`, {
        method: 'DELETE',
        body: null,
      });
      console.log(response.json());
      if (response.ok) {
        console.log('Reject member with id:', registrationId);
        // Optionally, you can refetch the members or update the state to reflect the changes
        fetchMembers();
      } else {
        console.error('Failed to reject member');
      }
    } catch (error) {
      console.error('Error reject member:', error);
    }
  };

  return (
    <div className='text-white flex flex-row min-h-screen bg-gray-900'>
      <div className='w-1/4'>
        <Adminsidebar />
      </div>
      <div className='w-3/4 p-8'>
        <button 
          onClick={fetchMembers} 
          className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 translate-x-[300%]'
        >
          Fetch Members
        </button>
        {members.length > 0 && (
          <table className='min-w-full bg-gray-800 text-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b border-gray-700'>Registration ID</th>
                <th className='py-2 px-4 border-b border-gray-700'>Name</th>
                <th className='py-2 px-4 border-b border-gray-700'>Email</th>
                <th className='py-2 px-4 border-b border-gray-700'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.registrationId} className='hover:bg-gray-700'>
                  <td className='py-2 px-4 border-b border-gray-700'>{member.registrationId}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>{member.name}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>{member.email}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>
                    <button 
                      onClick={() => handleApprove(member.registrationId)} 
                      className='mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 border'
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(member.registrationId)} 
                      className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 border'
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Addmember;
