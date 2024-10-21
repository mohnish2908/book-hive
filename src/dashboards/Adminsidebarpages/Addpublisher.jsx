import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const Addpublisher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const location = useLocation();
  const { data } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      console.log(formData);
      response = await fetch(`http://localhost:8080/admin/addPublisher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const d = await response.json();
      console.log(d);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='text-white min-h-screen flex'>
      <Adminsidebar />
      <div className='flex-grow p-8'>
        <h2 className='text-2xl font-bold mb-6'>Add Publisher</h2>
        <form onSubmit={handlerSubmit} className='space-y-4'>
          <div className='form-group'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-300'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address' className='block text-sm font-medium text-gray-300'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <button type='submit' className='btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Addpublisher;
