import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Addadmin = () => {
  const [members, setMembers] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    address: '',
    password: '',
    contactNo: ''
  });

  const [con, setCon] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      console.log(formData);

      response = await fetch(`http://localhost:8080/admin/createAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const d = await response.json();
      console.log(d);
      if (d.data === null) {
        setCon(d.error.message);
      } else {
        setCon('User registered successfully ' + d.data.registrationId);
      }
      toast.success('Admin added successfully');
    } catch (networkError) {
      console.error('Network error:', networkError);
      toast.error('Error adding admin');
      return;
    } finally {
        setFormData(
            {
                name: '',
                gender: '',
                email: '',
                address: '',
                password: '',
                contactNo: ''
            }
        )
    }
  };

  return (
    <div className='text-white flex'>
      <div>
        <Adminsidebar data={data} />
      </div>

      <div className='w-full max-w-md mx-auto mt-8'>
        <form onSubmit={handleSubmit} className='bg-gray-800 p-8 rounded-lg shadow-md'>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
              style={{ color: 'black' }}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
              style={{ color: 'black' }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
              style={{ color: 'black' }}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
              style={{ color: 'black' }}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
              style={{ color: 'black' }}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Contact No:</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md'
              style={{ color: 'black' }}
            />
          </div>
          <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
            Add Admin
          </button>
        </form>
        {con && <p className='mt-4 text-center'>{con}</p>}
      </div>
    </div>
  );
}

export default Addadmin;
