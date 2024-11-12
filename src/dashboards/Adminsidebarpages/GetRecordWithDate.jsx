import React, { useState } from 'react';  
import Adminsidebar from '../../components/Adminsidebar';  
import { useLocation } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import Loader from '../../components/Loader';   

const GetRecordWithDate = () => {  
  const [loading, setLoading] = useState(false);  
  const [records, setRecords] = useState([]); // State to store the fetched data  
  const location = useLocation();  
  const { data } = location.state || {};  
  const [fromDate, setFromDate] = useState('');  
  const [toDate, setToDate] = useState('');  

  // Function to format the date in 'yyyy-MM-ddT00:00:00' or 'yyyy-MM-ddT23:59:59'  
  const formatDate = (date, isEndOfDay = false) => {  
    const formattedDate = new Date(date);  
    const year = formattedDate.getFullYear();  
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');  
    const day = String(formattedDate.getDate()).padStart(2, '0');  
    
    // If it's the end of the day (23:59:59)  
    const time = isEndOfDay ? 'T23:59:59' : 'T00:00:00';  
    
    return `${year}-${month}-${day}${time}`; // Fixed template literal  
  };  

  const getData = async () => {  
    // Validate dates  
    if (!fromDate || !toDate) {  
      toast.error('Please select both dates.');  
      return;  
    }  

    if (new Date(fromDate) > new Date(toDate)) {  
      toast.error('From date cannot be later than To date.');  
      return;  
    }  

    // Format the fromDate and toDate  
    const formattedFromDate = formatDate(fromDate); // T00:00:00 by default  
    const formattedToDate = formatDate(toDate, true); // T23:59:59 for toDate  
    
    console.log(formattedFromDate, formattedToDate);  

    try {  
      setLoading(true);  
      const response = await fetch(`http://localhost:8080/admin/getRecordWithDate/${formattedFromDate}/${formattedToDate}`);  
      const res = await response.json();   
      console.log(res);  
      if (res.data.length === 0) toast.error('No records found');  
      setRecords(res.data || []); // Save the fetched data in state  
    } catch (error) {  
      console.error(error);  
      toast.error('Error fetching records');  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div className="flex flex-row text-white min-h-screen bg-black">  
      <Adminsidebar data={data} />  
      <div className="flex-1 p-6 bg-gray-900">  
        <div className="mb-4">  
          {/* Flex container for side-by-side layout */}  
          <div className="flex space-x-4">  
            {/* From date input */}  
            <div className="w-1/2">  
              <label className="block text-sm font-medium mb-2">From:</label>  
              <input  
                type="date"  
                name="fromDate"  
                value={fromDate}  
                onChange={(e) => setFromDate(e.target.value)} // Set the value of fromDate state  
                required  
                className="w-full p-2 border border-gray-300 rounded-md"  
                style={{ color: 'black' }}  
              />  
            </div>  
            {/* To date input */}  
            <div className="w-1/2">  
              <label className="block text-sm font-medium mb-2">To:</label>  
              <input  
                type="date"  
                name="toDate"  
                value={toDate}  
                onChange={(e) => setToDate(e.target.value)} // Set the value of toDate state  
                required  
                className="w-full p-2 border border-gray-300 rounded-md"  
                style={{ color: 'black' }}  
              />  
            </div>  
          </div>  
        </div>  
        
        {/* Button to fetch the data */}  
        <button  
          onClick={getData}  
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"  
        >  
          Get Data  
        </button>  
        
        {/* Show loading spinner while fetching data */}  
        {loading && <Loader />}   

        {/* Display the records if available */}  
        {!loading && records.length > 0 && (  
          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg mt-6">  
            <table className="min-w-full table-auto text-white">  
              <thead className="bg-gray-700">  
                <tr>  
                  <th className="px-4 py-2">Admin Id:</th>  
                  <th className="px-4 py-2">Member Id:</th>  
                  <th className="px-4 py-2">Date & Time:</th>  
                  
                </tr>  
              </thead>  
              <tbody className="bg-gray-900">  
                {records.map((record, index) => (  
                  <tr key={index} className="border-b border-gray-700">  
                    <td className="px-4 py-2">{record.adminId}</td>  
                    <td className="px-4 py-2">{record.bookId}</td>  
                    <td className="px-4 py-2">{new Date(record.issueDate).toLocaleString()}</td> {/* Improved date formatting */}  
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

export default GetRecordWithDate;