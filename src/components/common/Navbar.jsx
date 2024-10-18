import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'

const Navbar = () => {
  return (
    <div className='flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700 '>
      <div className='flex w-9/12 max-w-maxContent items-center justify-around translate-x-[10%]'>
        <Link>
          <img src={logo} alt='logo' width={160} height={42}/>
        </Link>
        

      <div className='flex gap-x-6 text-richblack-25'>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/checkAvaibility">Search Book</Link>
      </div>

      <div className='flex gap-x-6 text-richblack-25'>
        <Link to="/login" >Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      </div>

    </div>
  )
}

export default Navbar
