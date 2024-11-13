import React from 'react';
import { useLocation } from 'react-router-dom';
import Adminsidebar from '../components/Adminsidebar';

const Admin = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-1/4">
        <Adminsidebar data={data} />
      </div>
      <div className="flex flex-col items-center justify-center w-3/4 p-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h1 className="text-4xl font-semibold mb-6 text-center text-cyan-500">Welcome, {data?.name}</h1>
          <div className="space-y-4">
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Admin ID:</span>
              <span className="text-gray-100">{data?.adminId}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Name:</span>
              <span className="text-gray-100">{data?.name}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Gender:</span>
              <span className="text-gray-100 capitalize">{data?.gender}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Email:</span>
              <span className="text-gray-100">{data?.email}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Address:</span>
              <span className="text-gray-100">{data?.address}</span>
            </div>
            <div className="text-lg flex justify-between items-center">
              <span className="font-semibold text-gray-300">Contact Number:</span>
              <span className="text-gray-100">{data?.contactNo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
