import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let response;
  //     try {
  //       response = await fetch(`http://localhost:8080/${role}/login`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ username, password }),
  //       });
  //     } catch (networkError) {
  //       console.error('Network error:', networkError);
  //       return;
  //     }
  //     console.log(response);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       if (data.role === 'admin') {
  //         navigate('/admin');
  //       } else if (data.role === 'member') {
  //         navigate('/member');
  //       }
  //     } else {
  //       console.error('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username,password,role);
    if(role=='member')navigate('/member');
    else navigate('/admin');

  }

  return (
    <div>
      <Navbar />
      <div className='text-white flex flex-col justify-center items-center h-screen'>
        <div className="h-1/2 w-1/3 border flex flex-col justify-center items-center">
          <h1 className='text-3xl font-bold'>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-7'>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ color: 'black', marginLeft: '20px' }}
              />
            </div>
            <div className='mt-2'>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: 'black', marginLeft: '22px' }}
              />
            </div>
            <div className='mt-2'>
              <label htmlFor="role">Login as:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ color: 'black', marginLeft: '33px' }}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
            <button type="submit" className='mt-7 translate-x-[150%] bg-richblack-500 text-black px-4 py-1'>Login</button>
          </form>
          <div className="mt-4 text-center">
            <p>Not a member? <a href="/signup" className="text-blue-500">Signup</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
