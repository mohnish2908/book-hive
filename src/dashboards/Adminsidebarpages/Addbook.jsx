
import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const Addbook = () => {
  const [members, setMembers] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};


  return (
    <div className='text-white'>
      <div>
        <Adminsidebar data={data} />
      </div>
      
      <div>

      </div>
    </div>
  )
}

export default Addbook
