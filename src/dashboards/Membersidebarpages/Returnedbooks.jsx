import React from 'react'
import MemberSidebar from '../../components/Membersidebar'
import { useLocation } from 'react-router-dom';


const Returnedbooks = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
  return (
    <div className='text-white'>
        <MemberSidebar data={data}/>
        Returnedbooks
    </div>
  )
}

export default Returnedbooks
