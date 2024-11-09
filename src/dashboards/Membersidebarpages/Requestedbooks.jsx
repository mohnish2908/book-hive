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
      <div>  
        <h1>Requested Books</h1>  
        <button onClick={fetchRequestedBooks}>Fetch Requested Books</button>  
        {loading && <p>Loading...</p>}  
        {error && <p className="error">{error}</p>}  
        
        <table>  
          <thead>  
            <tr>  
              <th>Request ID</th>  
              <th>Book ID</th>  
              <th>Title</th>  
              <th>Author Name</th>  
                
               
                
                
               
              <th>Category</th>  
               
              <th>Publisher</th>  
            </tr>  
          </thead>  
          <tbody>  
            {requestedBooks.length > 0 ? (  
              requestedBooks.map((request, index) => (  
                <tr key={index}>  
                  <td>{request.requestId}</td>  
                  <td>{request.book.bookId}</td>  
                  <td>{request.book.title}</td>  
                  <td>{request.book.authorName}</td>  
                    
                  <td>{request.book.category}</td>  
                  
                  <td>{request.book.publisher.name} ({request.book.publisher.email})</td>  
                </tr>  
              ))  
            ) : (  
              <tr>  
                <td colSpan="12">No requested books found.</td>  
              </tr>  
            )}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  );  
};  

export default Requestedbooks;