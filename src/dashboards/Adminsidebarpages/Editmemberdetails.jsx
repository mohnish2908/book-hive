import React from 'react'
import Adminsidebar from '../../components/Adminsidebar'
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';

const Editmemberdetails = () => {
    const {data} = location.state || {};

  return (
    <div className='text-white'>
        <Adminsidebar data={data} />
        Editmemberdetails
    </div>
  )
}

export default Editmemberdetails
