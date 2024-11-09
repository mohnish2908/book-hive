import React, { useState, useEffect } from 'react';
import Membersidebar from '../../components/Membersidebar';
import { useLocation } from 'react-router-dom';

const Issuedbooks = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [issuedbook, setIssuedBook] = useState([]);

  const fetchIssuedBooks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/member/allIssuedBook/${data.memberId}`, {
        method: 'GET',
      });
      const issuedBooksData = await response.json();
      
      // Fetch book details for each issued book
      const issuedBooksWithDetails = await Promise.all(
        issuedBooksData.data.map(async (book) => {
          const bookDetailsResponse = await fetch(`http://localhost:8080/member/getBookById/${book.bookId}`, {
            method: 'GET',
          });
          const bookDetails = await bookDetailsResponse.json();
          
          return {
            ...book,
            bookName: bookDetails.data.title,
            author: bookDetails.data.authorName,
          };
        })
      );
      
      setIssuedBook(issuedBooksWithDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='text-white flex'>
      <Membersidebar data={data}/>
      <div className='translate-x-[150%] mt-6'>
        <button
          onClick={fetchIssuedBooks}
          className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          Fetch Issued Books
        </button>

        {issuedbook.length > 0 ? (
          issuedbook.map((book) => (
            <div key={book.bookId} className='bg-gray-700 p-4 rounded-md mb-4'>
              <p>Book Name: {book.bookName}</p>
              <p>Author: {book.author}</p>
              <p>Issued Date: {new Date(book.issueDate).toLocaleDateString('en-GB')}</p>
              <p>Due Date: {new Date(new Date(book.issueDate).setDate(new Date(book.issueDate).getDate() + 30)).toLocaleDateString('en-GB')}</p>
            </div>
          ))
        ) : (
          <p className='text-5xl translate-x-[-10%]'>No issued book</p>
        )}
      </div>
    </div>
  );
}

export default Issuedbooks;
