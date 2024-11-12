import React from 'react'
import Adminsidebar from '../../components/Adminsidebar'
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';

const Editmemberdetails = () => {
    const location = useLocation();
    const {data} = location.state || {};
    console.log(data);

  return (
    <div className='text-white'>
        <Adminsidebar data={data} />
        Editmemberdetails
    </div>
  )
}

export default Editmemberdetails
