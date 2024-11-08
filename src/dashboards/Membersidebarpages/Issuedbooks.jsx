import React from 'react'
import Membersidebar from '../../components/Membersidebar'
import { useLocation } from 'react-router-dom';

const Issuedbooks = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
  return (
    <div className='text-white flex '>
      <Membersidebar data={data}/>
    </div>
  )
}

export default Issuedbooks
