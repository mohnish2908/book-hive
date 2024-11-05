import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const RequestIssue = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
  return (
    <div>
      <Adminsidebar data={data} />
    </div>
  )
}

export default RequestIssue
