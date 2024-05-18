import toast from "react-hot-toast";
import UseAuth from "../Hooks/UseAuth";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";




const ApplyForPosition = () => {
    const { user } = UseAuth();
    const navigate = useNavigate()
    const jobData = useLoaderData();

    const { _id, position_title, category, description, organizer_name, organizer_email, max_age, min_age, deadline, numberOfVolunteer, thumbnail, location } = jobData || {};
    

    const handleFormSubmission = async event => {
        event.preventDefault();
        const form = event.target;

        const volunteerName = user?.displayName;
        const volunteerEmail = user?.email;
        const volunteerAge = form.age.value;
        const suggestion = form.suggestion.value;
        const status = form.status.value;
       

        const applicationData = { position_title, category, description, organizer_name, organizer_email, max_age, min_age, deadline, numberOfVolunteer, thumbnail, location, volunteerName,  volunteerEmail, volunteerAge, suggestion, status }
        console.table(applicationData);

        // validation
        // if (user?.email === organizer_email) return toast('Action is not permited');

        // send data in index.js
        try {
            const { data } = await axios.post('https://assignment11server-phi.vercel.app/applications', applicationData);

            console.log(data);
            toast.success('Bid has been placed!!')
            navigate('/myApplication')
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div className=" w-9/12 m-auto mt-10">
            <section className='p-6   bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
                <h2 className=' text-gray-700 capitalize text-4xl mb-5 font-bold text-center'>
                    Apply for : {position_title}
                </h2>
                {/* onSubmit={handleFormSubmission} */}
                <form onSubmit={handleFormSubmission}  className="border-2 border-red-500 p-5 pt-10">
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 '>
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='job_title'>
                                Position Title
                            </label>
                            <input
                                id='position_title'
                                name='position_title'
                                type='text'
                                defaultValue={position_title}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        {/* Organizer Name  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='emailAddress'>
                                Organizer Name
                            </label>
                            <input
                                id='organizerName'
                                type='email'
                                name='organizer_name'
                                defaultValue={organizer_name}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        {/* Organizer Email Address  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='emailAddress'>
                                Organizer Email Address
                            </label>
                            <input
                                id='emailAddress'
                                type='email'
                                name='organizer_email'
                                defaultValue={organizer_email}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        
                        {/* Number of volunteers Needed  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='emailAddress'>
                                Number of volunteers Needed
                            </label>
                            <input
                                id='numberOfVolunteer'
                                type='number'
                                name='numberOfVolunteer'
                                defaultValue={numberOfVolunteer}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        {/* deadline  */}
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 text-xl font-bold'>Deadline</label>

                            {/* Date Picker Input Field */}
                            <input
                                id='deadline'
                                type='text'
                                name='deadline'
                                defaultValue={deadline}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                            
                            
                        </div>

                        {/* category  */}
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='category'>
                                Category
                            </label>
                            <select
                                name='category'
                                id='category'
                                className='border p-2 rounded-md'
                                disabled
                                defaultValue={category}
                            >
                                <option value='Health Care'>Health Care</option>
                                <option value='Education'>Education</option>
                                <option value='Social Service'>Social Service</option>
                                <option value='Animal Welfare'>Animal Welfare</option>
                            </select>
                        </div>

        {/* min age  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='min_price'>
                                Minimum Age
                            </label>
                            <input
                                id='min_age'
                                name='min_age'
                                type='number'
                                placeholder="18 Years"
                                defaultValue={min_age}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        {/* max age  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='max_price'>
                                Maximum Age
                            </label>
                            <input
                                id='max_age'
                                name='max_age'
                                type='number'
                                placeholder="65 Years"
                                defaultValue={max_age}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        {/* thumbnail  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold ' htmlFor='max_price'>
                                Thumbnail
                            </label>
                            <input
                                id='thumbnail'
                                name='thumbnail'
                                type='text'
                                placeholder="Insert here an image link of the job"
                                defaultValue={thumbnail}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        {/* location  */}
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='max_price'>
                                Location
                            </label>
                            <input
                                id='location'
                                name='location'
                                type='text'
                                placeholder="Name of the city"
                                defaultValue={location}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                    </div>

                    {/* description  */}
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-gray-700 text-xl font-bold text-center mt-4' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='block w-full px-4 py-8 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            name='description'
                            id='description'
                            defaultValue={description}
                            disabled
                            placeholder="Write Here Your Job Requiremnts....."
                        ></textarea>
                    </div>
                    <div>


                        <div className="mt-8 border-4 border-yellow-600 p-5">
                            <h1 className="text-3xl text-center font-bold border-b-2 border-red-700 mb-5">Volunteer Information </h1>
                            {/* Volunteer Name */}
                            <div>
                                <label className='text-gray-700 text-xl font-bold' htmlFor='volunteerName'>
                                    Volunteer Name
                                </label>
                                <input
                                    id='volunteerName'
                                    type='text'
                                    name='volunteerName'
                                    defaultValue={user?.displayName}
                                    // disabled
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            {/* Volunteer Email Address */}
                            <div>
                                <label className='text-gray-700 text-xl  font-bold' htmlFor='emailAddress'>
                                    Volunteer Email Address
                                </label>
                                <input
                                    id='volunteerEmail'
                                    type='email'
                                    name='volunteerEmail'
                                    defaultValue={user?.email}
                                    // disabled
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>  

                            {/* volunteer age  */}
                            <div>
                                <label className='text-gray-700 text-xl  font-bold' htmlFor='age'>
                                    Volunteer Age
                                </label>
                                <input
                                    id='age'
                                    type='text'
                                    name='age'
                                    required
                                    placeholder="Please Insert your current Age"
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            
                            {/* suggestion  */}
                            <div className='flex flex-col gap-2 '>
                                <label className='text-gray-700 text-xl font-bold  mt-4' htmlFor='description'>
                                    Suggestion
                                </label>
                                <textarea
                                    className='block w-full px-4 py-8 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    name='suggestion'
                                    id='suggestion'
                                    required
                                    placeholder="Write Here Your suggestions....."
                                ></textarea>
                            </div>

                            {/* status  */}
                            <div className='flex flex-col gap-2 mt-2'>
                                <label className='text-gray-700 text-xl font-bold' htmlFor='category'>
                                    Status
                                </label>
                                <select
                                    name='status'
                                    id='status'
                                    className='border p-2 rounded-md'
                                    
                                    defaultChecked
                                >
                                    <option value='Requested'>Requested</option>
                                    <option value='Complete'>Complete</option>
                                    
                                </select>
                            </div>
                </div>

                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className='px-16 py-5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-purple-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                            Request
                        </button>
                    </div>
                </form>
            </section>
            
        </div>
    );
};

export default ApplyForPosition;