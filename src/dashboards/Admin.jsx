import React from 'react';
import { useLocation } from 'react-router-dom';
import Adminsidebar from '../components/Adminsidebar';

const Admin = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className='flex flex-row text-white'>
      <Adminsidebar data={data} />
      <div>
        <h1>Welcome, {data?.name}</h1>
      </div>
    </div>
  );
};

export default Admin;
