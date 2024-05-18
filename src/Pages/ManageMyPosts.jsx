import { useEffect, useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import ManageMyPostsCard from "./ManageMyPostsCard";

const ManageMyPosts = () => {
    const { user } = UseAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [isGridView, setIsGridView] = useState(false);

    useEffect(() => {
        getData();
    }, [myPosts]); // Trigger effect when myPosts changes

    const getData = async () => {
        if (user && user.email) {
            try {
                const { data } = await axios(`https://assignment11server-phi.vercel.app/myPosts/${user.email}`, { withCredentials: true });
                setMyPosts(data);
            } catch (error) {
                console.error("Error fetching my posts:", error);
            }
        }
    };
    

    const handleDelete = async id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://assignment11server-phi.vercel.app/delete/${id}`);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    const remainingPosts = myPosts.filter(post => post.id !== id);
                    setMyPosts(remainingPosts);
                } catch (err) {
                    toast.error(err.message)
                }
            }
        });
    };

    const toggleView = () => {
        setIsGridView(prevState => !prevState);
    };

    return (
        <div className="border-4 border-slate-700 mt-6 p-6">
            <div className="flex justify-around items-center mb-4">
                <div className='flex items-center gap-x-3'>
                    <h2 className='text-lg font-medium text-gray-800 '>My Posted {myPosts.length > 1 ? 'Advertisements' : 'Advertisement'} </h2>
                    <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                        {myPosts.length} 
                    </span>
                </div>
                <div>
                    <button onClick={toggleView} className="btn btn-accent">View {isGridView ? "Table" : "Grid"}</button>
                </div>
            </div>

         
            {isGridView ? (
                <div id="grid" className="grid grid-cols-3 gap-6 m-10">
                    {myPosts.map(post => <ManageMyPostsCard key={post._id} data={post} handleDelete={handleDelete} ></ManageMyPostsCard>)}
                </div>
            ) : (
                <section className='container px-4 mx-auto pt-12'>
                    <div className='flex flex-col mt-6'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                                <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-50'>
                                            <tr>
                                                <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Title</span>
                                                    </div>
                                                </th>
                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    <span>Deadline</span>
                                                </th>
                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    <button className='flex items-center gap-x-2'>
                                                        <span>Age Range</span>
                                                    </button>
                                                </th>
                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    Category
                                                </th>
                                                <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    Description
                                                </th>
                                                <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white divide-y divide-gray-200 '>
                                            {myPosts.map(myPost => (
                                                <tr key={myPost._id}>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {myPost.position_title}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {myPost.deadline}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {myPost.min_age}-{myPost.max_age}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-2'>
                                                            <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
                                                                {myPost.category}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td title='' className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {myPost?.description.substring(0, 20)}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-6'>
                                                            <button onClick={() => handleDelete(myPost?._id)} className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                                                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' color="red" viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                                                                </svg>
                                                            </button>
                                                            <Link title="Update" to={`/update/${myPost._id}`}>
                                                                <button className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' color="blue" viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5'>
                                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                                                                    </svg>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default ManageMyPosts;