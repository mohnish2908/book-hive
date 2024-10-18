import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your login logic here

  };

  return (
    <div className='text-white flex flex-col justify-center items-center h-screen '>
      <div className="h-1/2 w-1/3 border flex flex-col justify-center items-center">
      <h1 className='text-3xl font-bold	'>Login</h1>
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
            style={{ color: 'black' , marginLeft: '22px' }}
          />
        </div>
        <button type="submit" className='mt-7 translate-x-[150%] bg-richblack-500 text-black px-4 py-1' >Login</button>
      </form>
        <div className="mt-4 text-center">
          <p>Not a member? <a href="/signup" className="text-blue-500">Signup</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
