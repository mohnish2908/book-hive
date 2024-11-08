import React from 'react'
import MemberSidebar from '../../components/Membersidebar'
import { useLocation } from 'react-router-dom';


const Requestedbooks = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
  return (
    <div className='text-white'>
        <MemberSidebar data={data}/>
        Requestedbooks
    </div>
  )
}

export default Requestedbooks
