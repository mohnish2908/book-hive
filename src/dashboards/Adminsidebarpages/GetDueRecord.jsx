import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Getduerecord = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};
  console.log("data:", data);

  const getDueRecord = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:8080/admin/getDueRecord`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const d = await response.json();
      setRecords(d.data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching due record');
    } finally {
      setLoading(false);
    }
  };

  const sendMail = async (record) => {
    try {
      setLoading(true);
      
      const url = `http://localhost:8080/admin/dueMail`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId: record.memberId,
          bookId: record.bookId,
          adminId: record.adminId,
          issueDate: record.issueDate,
        }),
      });
      const d = await response.json();
      console.log(d);
      toast.success('Mail sent successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending mail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row text-white min-h-screen bg-black">
      <Adminsidebar data={data} />
      <div className="flex-1 p-6 bg-gray-900">
        <button
          onClick={getDueRecord}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
        >
          Get Due Record
        </button>
        {loading && <Loader />}
        {!loading && records.length > 0 && (
          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
            <table className="min-w-full table-auto text-white">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2">Member ID</th>
                  <th className="px-4 py-2">Book ID</th>
                  <th className="px-4 py-2">Issue Date</th>
                  <th className='px-4 py-2'>Due Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900">
                {records.map((record, index) => (
                  <tr key={index} className="border border-gray-700">
                    <td className="px-4 py-2 translate-x-[20%]">{record.memberId}</td>
                    <td className="px-4 py-2 translate-x-[20%]">{record.bookId}</td>
                    <td className="px-4 py-2 translate-x-[20%]">
                      {new Date(record.issueDate).toLocaleString().split(',')[0]}
                    </td>
                    <td className="px-4 py-2 translate-x-[20%]">
                      {new Date(new Date(record.issueDate).setDate(new Date(record.issueDate).getDate() + 30)).toLocaleString().split(',')[0]}
                    </td>
                    <td>
                      <button
                        onClick={() => sendMail(record)}
                        className="translate-x-[35%] bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                      >
                        Send Mail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Getduerecord;