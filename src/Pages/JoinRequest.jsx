import { useEffect, useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import axios from "axios";
import toast from "react-hot-toast";


const JoinRequest = () => {
    const { user } = UseAuth();
    const [joinRequests, setJoinRequests] = useState([]);

    useEffect(() => {
        getData();
    }, [user]); 

    //getData function was inside useEffect but now it is outside for getting benefit of updating the UI after executing the handleDelete function successfully
    const getData = async () => {
        const { data } = await axios(`https://assignment11server-phi.vercel.app/joinRequest/${user?.email}`, { withCredentials: true });
        setJoinRequests(data);
    }
 

    // // Handle Status
    const handleStatus = async (id, prevStatus, status) => {
        // console.log(id, prevStatus, status);
        //prevent update request onece status has been changed.
        if (prevStatus === ('Accepted' || 'Rejected')) return toast('This decision aleady has been made.')

        // send data in server 
        const { data } = await axios.patch(`https://assignment11server-phi.vercel.app/volRequest/${id}`, { status });
        console.log(data);
        getData(); //to update to status
    };




    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>Join Requests</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {joinRequests.length} Requests
                </span>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Email</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <span>Deadline</span>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>Age</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Category
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Status
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                    {
                                        joinRequests.map((joinRequest, index) => (

                                            <tr key={index + 1}>
                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {joinRequest.position_title}
                                                </td>
                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {joinRequest.volunteerEmail}
                                                </td>

                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {joinRequest.deadline}
                                                </td>

                                                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                    {joinRequest.volunteerAge}
                                                </td>
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <p
                                                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                           text-xs'
                                                        >
                                                            {joinRequest.category}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                    <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500'>
                                                        <span className='h-1.5 w-1.5 rounded-full bg-yellow-500'></span>
                                                        <h2 className='text-sm font-normal '>{joinRequest.status}</h2>
                                                    </div>
                                                </td>

                                                {/* Actions button */}
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    <div className='flex items-center gap-x-6'>


                                                        {/* Accept button */}
                                                        <button
                                                            onClick={() => {
                                                                handleStatus(joinRequest._id, joinRequest.status, 'Accepted')
                                                            }}
                                                            disabled={joinRequest.status === 'Complete'}
                                                            className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth='1.5'
                                                                stroke='currentColor'
                                                                className='w-5 h-5'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='m4.5 12.75 6 6 9-13.5'
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* reject button  */}
                                                        <button
                                                            onClick={() => {
                                                                handleStatus(joinRequest._id, joinRequest.status, 'Rejected')
                                                            }}

                                                            disabled={joinRequest.status === 'Complete'}
                                                            className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth='1.5'
                                                                stroke='currentColor'
                                                                className='w-5 h-5'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default JoinRequest;