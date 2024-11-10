import React, { useState, useEffect } from 'react';
import MemberSidebar from '../../components/Membersidebar';
import { useLocation } from 'react-router-dom';

const Requestedbooks = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequestedBooks = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await fetch(`http://localhost:8080/member/allRequestedBook/${data.memberId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log("responseData", responseData);

      // Assuming responseData.data is the correct structure
      setRequestedBooks(responseData.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message); // Set error message for UI
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchRequestedBooks();
  }, [data]);

return (
    <div className='text-white flex'>
        <MemberSidebar data={data} />
        <div className='flex-1 p-6'>
            <h1 className='text-2xl font-bold mb-4'>Requested Books</h1>
            <button
                onClick={fetchRequestedBooks}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
            >
                Fetch Requested Books
            </button>
            {loading && <p className='text-yellow-500'>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}

            <table className='min-w-full bg-gray-800 text-white'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 border-b border-gray-700'>Request ID</th>
                        <th className='py-2 px-4 border-b border-gray-700'>Book ID</th>
                        <th className='py-2 px-4 border-b border-gray-700'>Title</th>
                        <th className='py-2 px-4 border-b border-gray-700'>Author Name</th>
                        <th className='py-2 px-4 border-b border-gray-700'>Category</th>
                        <th className='py-2 px-4 border-b border-gray-700'>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    {requestedBooks.length > 0 ? (
                        requestedBooks.map((request, index) => (
                            <tr key={index} className='hover:bg-gray-700'>
                                <td className='py-2 px-4 border-b border-gray-700'>{request.requestId}</td>
                                <td className='py-2 px-4 border-b border-gray-700'>{request.book.bookId}</td>
                                <td className='py-2 px-4 border-b border-gray-700'>{request.book.title}</td>
                                <td className='py-2 px-4 border-b border-gray-700'>{request.book.authorName}</td>
                                <td className='py-2 px-4 border-b border-gray-700'>{request.book.category}</td>
                                <td className='py-2 px-4 border-b border-gray-700'>{request.book.publisher.name} ({request.book.publisher.email})</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className='py-2 px-4 border-b border-gray-700 text-center'>No requested books found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default Requestedbooks;
