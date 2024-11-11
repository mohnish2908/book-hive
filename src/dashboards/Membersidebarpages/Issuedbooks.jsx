import React, { useState, useEffect } from 'react';
import Membersidebar from '../../components/Membersidebar';
import { useLocation } from 'react-router-dom';

const Issuedbooks = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const [issuedbook, setIssuedBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIssuedBooks = async () => {
        setLoading(true);
        setError(null); // Reset error state
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
            console.log(issuedBooksWithDetails)
            setIssuedBook(issuedBooksWithDetails);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssuedBooks();
    }, [data]);

    return (
        <div className='text-white flex'>
            <Membersidebar data={data}/>
            <div className='ml-6 mt-6 w-full'>
                <h1 className='text-2xl font-bold mb-4'>Issued Books</h1>

                <button
                    onClick={fetchIssuedBooks}
                    className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                >
                    Fetch Issued Books
                </button>
                {loading && <p className='text-yellow-500'>Loading...</p>}
                {error && <p className='text-red-500'>{error}</p>}

                {issuedbook.length > 0 ? (
                    <table className='min-w-full bg-gray-800 text-white border border-gray-700'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 border-b border-gray-700'>Book ID</th>
                                <th className='px-4 py-2 border-b border-gray-700'>Book Name</th>
                                <th className='px-4 py-2 border-b border-gray-700'>Author</th>
                                <th className='px-4 py-2 border-b border-gray-700'>Issued By(admin)</th>
                                <th className='px-4 py-2 border-b border-gray-700'>Issued Date</th>
                                <th className='px-4 py-2 border-b border-gray-700'>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issuedbook.map((book) => (
                                <tr key={book.bookId} className='bg-gray-700'>
                                    <td className='px-4 py-2 border-b border-gray-600'>{book.bookId}</td>
                                    <td className='px-4 py-2 border-b border-gray-600'>{book.bookName}</td>
                                    <td className='px-4 py-2 border-b border-gray-600'>{book.author}</td>
                                    <td className='px-[6%] py-2 border-b border-gray-600'>{book.adminId}</td>
                                    <td className='px-[3%] py-2 border-b border-gray-600'>
                                        {new Date(book.issueDate).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className='px-[2%] py-2 border-b border-gray-600'>
                                        {new Date(new Date(book.issueDate).setDate(new Date(book.issueDate).getDate() + 30)).toLocaleDateString('en-GB')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='text-2xl'>No issued book</p>
                )}
            </div>
        </div>
    );
};

export default Issuedbooks;
