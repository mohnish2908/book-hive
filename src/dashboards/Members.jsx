import React from 'react';
import Membersidebar from '../components/Membersidebar';
import { useLocation } from 'react-router-dom';

const Members = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Membersidebar data={data} />
      <div className="flex flex-col items-center justify-center w-full p-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h1 className="text-4xl font-semibold mb-6 text-center text-cyan-500">Welcome, {data?.name}</h1>
          <div className="space-y-4">
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Member ID:</span>
              <span className="text-gray-100">{data?.memberId}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Email:</span>
              <span className="text-gray-100">{data?.email}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Contact Number:</span>
              <span className="text-gray-100">{data?.contactNo}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Address:</span>
              <span className="text-gray-100">{data?.address}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Status:</span>
              <span className="text-green-400">{data?.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
