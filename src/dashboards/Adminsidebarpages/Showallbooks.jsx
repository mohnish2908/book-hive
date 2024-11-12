import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const Showallbooks = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);

    const getAllBooks = async () => {
        try {
            const res = await fetch("http://localhost:8080/admin/getAllBooks");
            const response = await res.json();
            console.log("response:", response);

            if (response.data) {
                setBooks(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const requestBookHandler = async (bookId) => {
        setLoading(true);
        console.log("Book Id:", bookId);
        console.log("Member Id:", data.memberId);
        try {
            const response = await fetch('http://localhost:8080/member/addBookRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberId: data.memberId,
                    bookId: [bookId],
                }),
            });
            const responseData = await response.json();
            console.log("responseData:", responseData);
            if(responseData.error) toast.error('Book limit exceeded');
            else toast.success('Book requested successfully');
            getAllBooks();
        } catch (error) {
            console.log("error:",error);
            toast.error('Error requesting book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='text-white flex flex-row'>
            <Adminsidebar data={data} />
            <div className='flex-1 p-4'>
                <button onClick={getAllBooks} className='bg-blue-500 text-white px-4 py-2 rounded mb-4'>Fetch Books</button>

                {loading ? (
                    <Loader />
                ) : (
                    books.length > 0 && (
                        <table className="w-full text-left text-white border border-gray-600">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-2 border border-gray-600">Title</th>
                                    <th className="p-2 border border-gray-600">Author</th>
                                    <th className="p-2 border border-gray-600">Language</th>
                                    <th className="p-2 border border-gray-600">Category</th>
                                    <th className="p-2 border border-gray-600">Available</th>
                                    <th className="p-2 border border-gray-600">Total</th>
                                    {/* <th className="p-2 border border-gray-600">Request Book</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={index} className="border border-gray-600">
                                        <td className="p-2 border border-gray-600">{book.title}</td>
                                        <td className="p-2 border border-gray-600">{book.authorName}</td>
                                        <td className="p-2 border border-gray-600">{book.language}</td>
                                        <td className="p-2 border border-gray-600">{book.category}</td>
                                        <td className="p-2 border border-gray-600">{book.availableBook}</td>
                                        <td className="p-2 border border-gray-600">{book.totalBook}</td>
                                        {/* <td className="p-2 border border-gray-600">
                                            {book.availableBook > 0 ? (
                                                <button
                                                    className='p-2 bg-yellow-300 border rounded'
                                                    onClick={() => requestBookHandler(book.bookId)}
                                                >
                                                    Request
                                                </button>
                                            ) : (
                                                <p>Not available</p>
                                            )}
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
};

export default Showallbooks;
