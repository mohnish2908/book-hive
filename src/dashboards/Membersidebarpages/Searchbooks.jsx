import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Membersidebar from '../../components/Membersidebar';
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
            if(responseData.error) toast.error('Book limit exceeded');
            else toast.success('Book requested successfully');
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
        } finally {
            setBookName(''); // Clear the input field
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
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <h2 className='text-xl mb-2'>Title:</h2>
                                <p className='text-gray-400 mb-2'>Author Name:</p>
                                <p className='text-gray-400 mb-2'>Category:</p>
                                <p className='text-gray-400 mb-2'>Edition:</p>
                                <p className='text-gray-400 mb-2'>ISBN:</p>
                                <p className='text-gray-400 mb-2'>Language:</p>
                                <p className='text-gray-400 mb-2'>Publication Year:</p>
                                <p className='text-gray-400 mb-2'>Pages:</p>
                                <p className='text-gray-400 mb-2'>Publisher:</p>
                                <p className='text-gray-400 mb-2'>Available Books:</p>
                                <p className='text-gray-400 mb-2'>Total Books:</p>
                            </div>
                            <div>
                                <h2 className='text-xl mb-2'>{book.title}</h2>
                                <p className='text-gray-400 mb-2'>{book.authorName}</p>
                                <p className='text-gray-400 mb-2'>{book.category}</p>
                                <p className='text-gray-400 mb-2'>{book.edition}</p>
                                <p className='text-gray-400 mb-2'>{book.isbn}</p>
                                <p className='text-gray-400 mb-2'>{book.language}</p>
                                <p className='text-gray-400 mb-2'>{book.publicationYear}</p>
                                <p className='text-gray-400 mb-2'>{book.totalPages}</p>
                                <p className='text-gray-400 mb-2'>{book.publisher.name}</p>
                                <p className='text-gray-400 mb-2'>{book.availableBook}</p>
                                <p className='text-gray-400 mb-2'>{book.totalBook}</p>
                            </div>
                        </div>
                        {book.availableBook > 0 ? (
                            <div className='flex justify-center mt-4'>
                                <button className='p-2 bg-yellow-300 border rounded' onClick={() => requestBookHandler(book.bookId)}>
                                    Request
                                </button>
                            </div>
                        ) : (
                            <p className='text-center mt-4'>Not available to Issue</p>
                        )}
                        {loading && <Loader />}
                    </div>
                )}

                {error && <p className='text-red-500 mt-4'>{error}</p>}
            </div>
        </div>
    )
}

export default Searchbooks;
