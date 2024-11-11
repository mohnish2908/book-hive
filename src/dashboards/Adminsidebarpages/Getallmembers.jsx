import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const Getallmembers = () => {
    const [members, setMembers] = useState([]);
    const location = useLocation();
    const { data } = location.state || {};

    const fetchMembers = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/getAllMembers');
            const result = await response.json();
            console.log(result.data);
            setMembers(result.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    return (
        <div className='text-white flex min-h-screen bg-gray-900'>
            <div className='w-1/4 bg-gray-800'>
                <Adminsidebar />
            </div>
            <div className='flex-1 p-8'>
                <button
                    onClick={fetchMembers}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Get All Members
                </button>
                <div className='mt-8'>
                    {members.length > 0 ? (
                        <table className='min-w-full bg-gray-800 text-white border border-gray-700'>
                            <thead>
                                <tr>
                                    <th className='px-4 py-2 border-b border-gray-700'>Name</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Address</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Admin ID</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Contact No</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Email</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Gender</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Active</th>
                                    <th className='px-4 py-2 border-b border-gray-700'>Member ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => (
                                    <tr key={index} className='bg-gray-700'>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.name}</td>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.address}</td>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.adminId}</td>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.contactNo}</td>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.email}</td>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.gender}</td>
                                        <td className='px-4 py-2 border-b border-gray-600'>
                                            {member.isActive ? 'Yes' : 'No'}
                                        </td>
                                        <td className='px-4 py-2 border-b border-gray-600'>{member.memberId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-gray-400'>No members found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Getallmembers;
