import React, { useState } from 'react';
import MemberSidebar from '../../components/Membersidebar';
import { useLocation } from 'react-router-dom';

const Returnedbooks = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);

    const [books, setBooks] = useState([]);

    const getAllBooks = async () => {
        try {
            const res = await fetch("http://localhost:8080/admin/getAllBooks");
            const response = await res.json();
            console.log("response:", response);

            // Set the books data if it exists
            if (response.data) {
                setBooks(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='text-white flex flex-row'>
            <MemberSidebar data={data} />
            <div className='flex-1 p-4'>
                <button onClick={getAllBooks} className='bg-blue-500 text-white px-4 py-2 rounded mb-4'>Fetch Books</button>
                
                {books.length > 0 && (
                    <table className="w-full text-left text-white border border-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-2 border border-gray-600">Book ID</th>
                                <th className="p-2 border border-gray-600">Title</th>
                                <th className="p-2 border border-gray-600">Author</th>
                                <th className="p-2 border border-gray-600">Edition</th>
                                <th className="p-2 border border-gray-600">Language</th>
                                <th className="p-2 border border-gray-600">ISBN</th>
                                <th className="p-2 border border-gray-600">Total Pages</th>
                                <th className="p-2 border border-gray-600">Publication Year</th>
                                <th className="p-2 border border-gray-600">Category</th>
                                <th className="p-2 border border-gray-600">Available Count</th>
                                <th className="p-2 border border-gray-600">Publisher Name</th>
                                <th className="p-2 border border-gray-600">Publisher Email</th>
                                <th className="p-2 border border-gray-600">Publisher Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={index} className="border border-gray-600">
                                    <td className="p-2 border border-gray-600">{book.bookId}</td>
                                    <td className="p-2 border border-gray-600">{book.title}</td>
                                    <td className="p-2 border border-gray-600">{book.authorName}</td>
                                    <td className="p-2 border border-gray-600">{book.edition}</td>
                                    <td className="p-2 border border-gray-600">{book.language}</td>
                                    <td className="p-2 border border-gray-600">{book.isbn}</td>
                                    <td className="p-2 border border-gray-600">{book.totalPages}</td>
                                    <td className="p-2 border border-gray-600">{book.publicationYear}</td>
                                    <td className="p-2 border border-gray-600">{book.category}</td>
                                    <td className="p-2 border border-gray-600">{book.availableBook}</td>
                                    <td className="p-2 border border-gray-600">{book.publisher.name}</td>
                                    <td className="p-2 border border-gray-600">{book.publisher.email}</td>
                                    <td className="p-2 border border-gray-600">{book.publisher.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Returnedbooks;
