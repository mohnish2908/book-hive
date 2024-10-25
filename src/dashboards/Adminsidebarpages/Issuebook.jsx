import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';

const Issuebook = () => {
  const [issueDate, setIssueDate] = useState('');
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');

  const location = useLocation();
  const { data } = location.state || {};
  const [id, setId] = useState('');
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/admin/${data.adminId}/${memberId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issueDate, bookId }),
      });
      const d = await response.json();
      console.log(d);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-row text-black'>
      <Adminsidebar data={data} />
      <div className='flex flex-col items-center justify-center w-full p-8 bg-gray-100'>
        <form onSubmit={handleSubmit} className=' p-6 rounded-lg shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-4 text-richblack-500'>Issue Book</h2>
          <div className='mb-4 text-white'>
            <label className='block text-gray-700'>Issue Date:</label>
            <input
              type='date'
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>
          <div className='mb-4 text-white'>
            <label className='block text-gray-700'>Book ID:</label>
            <input
              type='text'
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>
          <div className='mb-4 text-white'>
            <label className='block text-gray-700'>Member ID:</label>
            <input
              type='text'
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Issuebook;
