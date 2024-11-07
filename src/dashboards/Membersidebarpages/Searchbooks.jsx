import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Membersidebar from '../../components/Membersidebar'
const Searchbooks = () => {
  
    const [bookName, setBookName] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      // console.log(bookName);
      const response = await fetch(`http://localhost:8080/member/getBookByTitle/${bookName}`, {
        method: 'GET',
      });
      const d=await response.json();
      console.log(d);

      if (d.data === null) {
        throw new Error(d.error.message);
      }
      console.log("data is:",d.data.title);
      console.log("data is:",d.data.publicationYear);
      setBook(d.data);
      setError('');
    } catch (err) {
      setBook(null);
      setError(err.message);
    }
  };

  return (
    
    <div> 
    <Membersidebar/>
      <div className='text-white flex flex-col justify-center items-center p-4'>
      
      <input
        type='text'
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        placeholder='Enter book name'
        className='text-black p-2 rounded border border-gray-300 mb-4'
      />
      <button 
        onClick={handleSearch} 
        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700'
      >
        Search
      </button>

      {book && (
        <div className='mt-4 p-4 border border-gray-300 rounded text-white'>
        
          <h2 className='text-xl font-bold text-white'>{book.title}</h2>
          <p className='text-gray-400'>{book.language}</p>
        </div>
      )}
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
    </div>
  )
}

export default Searchbooks
