import React, { useState, useEffect } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Addpublisher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [publishers, setPublishers] = useState([]);
  const [publisherId, setPublisherId] = useState('');
  const [showPublishers, setShowPublishers] = useState(false);
  const [fetchedPublisher, setFetchedPublisher] = useState(null);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/getAllPublisher');
      const data = await response.json();
      setPublishers(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching all publishers:', error);
      setPublishers([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/admin/addPublisher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      toast.success('Publisher added successfully');
      fetchPublishers();
    } catch (error) {
      console.error('Error adding publisher:', error);
      toast.error('Error adding publisher');
    } finally {
      setFormData({
        name: '',
        email: '',
        address: '',
      });
    }
  };

  const handleGetPublisher = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/getPublisher/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.data) {
        setFetchedPublisher(data);
        setMessage('');
        toast.success('Publisher fetched successfully');
      } else {
        setFetchedPublisher(null);
        setMessage('No such publisher found');
        toast.error(data.error.message);
      }
    } catch (error) {
      console.error('Error fetching publisher:', error);
      toast.error('Error fetching publisher');
      setFetchedPublisher(null);
      setMessage('Error fetching publisher');
    } finally {
      setPublisherId('');
    }
  };

  const handlePublisherIdChange = (e) => {
    setPublisherId(e.target.value);
  };

  const handleGetPublisherById = () => {
    handleGetPublisher(publisherId);
  };

  const togglePublishersList = () => {
    setShowPublishers(!showPublishers);
  };

  return (
    <div className='text-white min-h-screen flex'>
      <Adminsidebar />
      <div className='flex-grow p-8'>
        <h2 className='text-2xl font-bold mb-6'>Add Publisher</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='form-group'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='text-black mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
              className='text-black mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
              className='text-black mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <button type='submit' className='btn btn-primary bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md'>Add Publisher</button>
        </form>

        {/* Get publisher by ID */}
        <div className='mt-8'>
          <h3 className='text-xl font-bold mb-4'>Get Publisher by ID</h3>
          <div className='form-group'>
            <label htmlFor='publisherId' className='block text-sm font-medium text-gray-300'>Publisher ID</label>
            <input
              type='text'
              id='publisherId'
              name='publisherId'
              value={publisherId}
              onChange={handlePublisherIdChange}
              className='text-black mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <button onClick={handleGetPublisherById} className='btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4'>Get Publisher</button>
          {fetchedPublisher && (
            <div className='mt-4'>
              <h3 className='text-xl font-bold mb-4'>Publisher Details</h3>
              <table className='min-w-full bg-gray-700 text-gray-300'>
                <tbody>
                  <tr>
                    <td className='border px-4 py-2'>Publisher ID:</td>
                    <td className='border px-4 py-2'>{fetchedPublisher.data.publisherId}</td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>Name:</td>
                    <td className='border px-4 py-2'>{fetchedPublisher.data.name}</td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>Email:</td>
                    <td className='border px-4 py-2'>{fetchedPublisher.data.email}</td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>Address:</td>
                    <td className='border px-4 py-2'>{fetchedPublisher.data.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addpublisher;
