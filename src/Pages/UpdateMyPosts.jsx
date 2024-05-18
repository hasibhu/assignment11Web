import {  useLoaderData, useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import axios from "axios";
// import axios from "axios";

const UpdateMyPosts = () => {
   
    // const myPost = useLoaderData();
    const { id } = useParams();
    
    const { user } = UseAuth();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`https://assignment11server-phi.vercel.app/volunteerPost/${id}`);
    //             console.log("API response:", response); // Log the response object
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch volunteer post');
    //             }
    //             const data = await response.json();
    //             console.log("Fetched data:", data); // Log fetched data
    //             setJob(data);
    //         } catch (error) {
    //             console.error(error);
    //             toast.error("Failed to fetch job details");
    //         }
    //     };
    //     fetchData();
    // }, [id]);
    
    
    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        const { data } = await axios(`https://assignment11server-phi.vercel.app/myPost/${id}`)
        setPost(data);
    }


    const handleUpdate = async event => {
        event.preventDefault();
        const form = event.target;
        const position_title = form.position_title.value;
        const description = form.description.value;
        const deadline = startDate.toLocaleDateString(); // to covert the date into local format
        const category = form.category.value;
        const thumbnail = form.thumbnail.value;
        const location = form.location.value;
        const numberOfVolunteer = form.numberOfVolunteer.value;

        const updateData = {
            position_title,
            category,
            deadline,
            numberOfVolunteer,
            thumbnail,
            location,
            description
        };
        // console.table(updateData);

        // Send data to server for updating
    try {
        const { data } = await axios.put(`https://assignment11server-phi.vercel.app/update/${id}`, updateData);
        console.log(data);
        toast.success("Your job has been updated successfully!");
        navigate('/manageMyPosts');
    } catch (err) {
        console.error(err);
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(err.response.data.error || "Failed to update job");
        } else if (err.request) {
            // The request was made but no response was received
            toast.error("No response received from server");
        } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("An error occurred while updating job");
        }
    }
    };



    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
            <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md w-[890px] '>
                <h2 className='text-4xl text-center pb-8 font-semibold text-gray-700 capitalize m-16 border-b-4 border-lime-700'>
                    Update Your Post
                </h2>
                {/* onSubmit={handleUpdate}  */}
                <form onSubmit={handleUpdate} >
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 '>
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='job_title'>
                                Position Title
                            </label>
                            <input
                                id='position_title'
                                name='position_title'
                                type='text'
                                defaultValue={post?.position_title}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='emailAddress'>
                                Organizer Email Address
                            </label>
                            <input
                                id='emailAddress'
                                type='email'
                                name='email'
                                defaultValue={user?.email}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='emailAddress'>
                                Organizer Name
                            </label>
                            <input
                                id='emailAddress'
                                type='text'
                                name='userName'
                                defaultValue={user?.displayName}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='emailAddress'>
                                Number of volunteers Needed
                            </label>
                            <input
                                id='numberOfVolunteer'
                                type='number'
                                name='numberOfVolunteer'
                                defaultValue={post?.numberOfVolunteer}

                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 text-xl font-bold'>Deadline</label>

                            {/* Date Picker Input Field */}
                            <DatePicker className="text-xl border p-2" selected={startDate} onChange={(date) => setStartDate(date)}  />

                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='category'>
                                Category
                            </label>
                            <select
                                name='category'
                                id='category'
                                className='border p-2 rounded-md'
                            >
                                <option value='Health Care'>Health Care</option>
                                <option value='Education'>Education</option>
                                <option value='Social Service'>Social Service</option>
                                <option value='Animal Welfare'>Animal Welfare</option>
                            </select>
                        </div>

                        <div>
                            <label className='text-gray-700 text-xl font-bold ' htmlFor='max_price'>
                                Thumbnail
                            </label>
                            <input
                                id='thumbnail'
                                name='thumbnail'
                                type='text'
                                defaultValue={post?.thumbnail}
                                placeholder="Insert here an image link of the job"
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='max_price'>
                                Location
                            </label>
                            <input
                                id='location'
                                name='location'
                                type='text'
                                defaultValue={post?.location}
                                placeholder="Name of the city"
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-gray-700 text-xl font-bold text-center mt-4' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='block w-full px-4 py-8 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            name='description'
                            id='description'
                            placeholder="Write Here Your Job Requiremnts....."
                            defaultValue={post?.description}
                        ></textarea>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className=' px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-lime-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                            Update Post
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default UpdateMyPosts;



