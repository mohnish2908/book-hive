import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Login = () => {
  console.log('Login')
  return (
    <div>
        
        <h1>Login</h1>
        <Outlet />
    </div>
  )
}

export default Login
