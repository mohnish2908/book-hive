import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Membersidebar from '../../components/Membersidebar'
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Searchbooks = () => {
    const [loading, setLoading] = useState(false);
    const [bookName, setBookName] = useState('');
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
    const [message, setMessage] = useState('');

    const requestBookHandler = async () => {
        setLoading(true);
        console.log("Book Id:", book.bookId);
        console.log("Member Id:", data.memberId);
        try {
            const response = await fetch('http://localhost:8080/member/addBookRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberId: data.memberId,
                    bookId: [book.bookId], // Ensure bookId is sent as a list
                }),
            });
            const responseData = await response.json();
            console.log("responseData:", responseData);
            toast.success('Book requested successfully');
            setBookName('');
            setBook(null);
        } catch (error) {
            console.log(error);
            toast.error('Error requesting book');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/member/getBookByTitle/${bookName}`, {
                method: 'GET',
            });
            const d = await response.json();
            console.log(d);

            if (d.data === null) {
                throw new Error(d.error.message);
            }
            console.log("data is:", d.data.title);
            console.log("data is:", d.data.publicationYear);
            setBook(d.data);
            console.log("book is:", book);
            setError('');
            toast.success('Book found successfully');
        } catch (err) {
            setBook(null);
            setError(err.message);
            toast.error('Error finding book');
        }
    };

    return (
        <div className="flex flex-row min-h-screen bg-gray-900">
            <Membersidebar data={data} />
            <div className='text-white flex flex-col justify-center items-center p-4 w-full'>
                <label className="text-3xl mb-4">Search Book</label>
                <input
                    type='text'
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder='Enter book name'
                    className='text-black p-2 rounded border border-gray-300 mb-4 w-1/2'
                />
                <button
                    onClick={handleSearch}
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-1/2'
                >
                    Search Book
                </button>

                {book && (
                    <div className='mt-4 p-4 border border-gray-300 rounded text-white w-1/2'>
                        <h2 className='text-xl font-bold mb-2'>{book.title}</h2>
                        <p className='text-gray-400 mb-2'>Author Name: {book.authorName}</p>
                        <p className='text-gray-400 mb-2'>Category: {book.category}</p>
                        <p className='text-gray-400 mb-2'>Edition: {book.edition}</p>
                        <p className='text-gray-400 mb-2'>ISBN: {book.isbn}</p>
                        <p className='text-gray-400 mb-2'>Language: {book.language}</p>
                        <p className='text-gray-400 mb-2'>Publication Year: {book.publicationYear}</p>
                        <p className='text-gray-400 mb-2'>Pages: {book.totalPages}</p>
                        <p className='text-gray-400 mb-2'>Publisher ID: {book.publisher.name}</p>
                        <button className='bg-brown-500 text-white p-2 rounded hover:bg-richblack-500' onClick={requestBookHandler}>
                            Pre-request Book
                        </button>
                        {loading && <Loader />}
                    </div>
                )}

                {error && <p className='text-red-500 mt-4'>{error}</p>}
            </div>
        </div>
    )
}

export default Searchbooks