import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Issuebook = () => {
  const [issueDate, setIssueDate] = useState('');
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { data } = location.state || {};
  const adminId = data ? data.adminId : '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if bookId and memberId are filled
    if (!bookId || !memberId) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const url = `http://localhost:8080/admin/requestBookIssue`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, memberId, adminId }),
      });
      const d = await response.json();

      if(d.data === null) {
        toast.error('Book limit exceeded');
      } {
        toast.success('Book issued successfully');
      }
    // toast.success('Book issued successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error issuing book');
    } finally {
      setLoading(false);
      setBookId('');
      setMemberId('');
    }
  };

  return (
    <div className='flex flex-row text-white'>
      <Adminsidebar data={data} />
      <div className='flex flex-col items-center justify-center w-full p-8 bg-gray-100'>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className='p-6 rounded-lg shadow-md w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4 text-richblack-500'>Issue Book</h2>

            <div className='mb-4'>
              <label className='block text-gray-700'>Book ID:</label>
              <input
                type='text'
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className='mt-1 p-2 w-full border rounded-md text-black'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Member ID:</label>
              <input
                type='text'
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className='mt-1 p-2 w-full border rounded-md text-black'
                required
              />
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Issuebook;
