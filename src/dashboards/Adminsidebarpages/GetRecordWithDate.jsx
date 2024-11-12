import React, { useState } from 'react';  
import Adminsidebar from '../../components/Adminsidebar';  
import { useLocation } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import Loader from '../../components/Loader'; 

const GetRecordWithDate = () => {
    const [loading, setLoading] = useState(false);  
    const location = useLocation();  
    const { data } = location.state || {};
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const getData = async () => {
        try{
            const response = await fetch(`http://localhost:8080/admin/getRecordWithDate/${fromDate}/${toDate}`);
            const res = await response.json(); 
            console.log(res);
        }
        catch(error){
            console.log(error);
        }
    }
    return (
    <div className='felx flex-row text-white'>
      <Adminsidebar data={data} />
      <div>
      <label className='block text-sm font-medium mb-2'>From:</label>
                        <input
                            type="date"
                            name="publicationYear"
                            value={setFromDate}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
        <label className='block text-sm font-medium mb-2'>To:</label>
                        <input
                            type="date"
                            name="publicationYear"
                            value={setToDate}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
        <button onClick={getData()}>Get Data</button>

      </div>
    </div>
  )
}

export default GetRecordWithDate
