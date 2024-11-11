import React, { useState, useEffect } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Showallpublishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [showPublishers, setShowPublishers] = useState(false);
    const location = useLocation();

    useEffect(() => {
        fetchPublishers();
      }, []);

    const fetchPublishers = async () => {
        try {
          const response = await fetch('http://localhost:8080/admin/getAllPublisher');
          const data = await response.json();
          setPublishers(Array.isArray(data.data) ? data.data : []);
          toast.success('Fetched publishers successfully');
        } catch (error) {
          console.error('Error fetching all publishers:', error);
            setPublishers([]);
            toast.error('Error fetching publishers');
        }
      };
      const togglePublishersList = () => {
        setShowPublishers(!showPublishers);
      };

  return (
    <div className='text-white min-h-screen flex'>
        <Adminsidebar />
        <div className='mt-8'>
            <button
                onClick={togglePublishersList}
                className='btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
            >
                {showPublishers ? 'Hide All Publishers' : 'Show All Publishers'}
            </button>
            {showPublishers && (
            <div className='mt-4'>
                <table className='min-w-full bg-gray-800'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b border-gray-700'>Name</th>
                            <th className='py-2 px-4 border-b border-gray-700'>Email</th>
                            <th className='py-2 px-4 border-b border-gray-700'>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.map((publisher) => (
                        <tr key={publisher.id}>
                            <td className='py-2 px-4 border-b border-gray-700'>{publisher.name}</td>
                            <td className='py-2 px-4 border-b border-gray-700'>{publisher.email}</td>
                            <td className='py-2 px-4 border-b border-gray-700'>{publisher.address}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    </div>
  )
}

export default Showallpublishers
