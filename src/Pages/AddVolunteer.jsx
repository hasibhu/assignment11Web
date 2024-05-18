import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import axios from "axios";
import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import img from '../assets/images/volunteer-2055043.png'


const AddVolunteer = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = UseAuth();
    const navigate = useNavigate();


    const handleFormSubmission = async event => {
        event.preventDefault();
        const form = event.target;
        // const buyerEmail = buyer_email // taken from jobData
        const position_title = form.position_title.value;
        const min_age = parseFloat(form.min_age.value)
        const max_age = parseFloat(form.max_age.value)
        const organizer_email = user?.email;
        const organizer_name = user?.displayName
        const description = form.description.value;
        const deadline = startDate.toLocaleDateString(); // to covert the date into local format
        const category = form.category.value;
        const thumbnail = form.thumbnail.value;
        const location = form.location.value;
        const numberOfVolunteer = form.numberOfVolunteer.value;

        const postData = {
            position_title,
            organizer_name,
            organizer_email,
            category,
            deadline,
            numberOfVolunteer,
            min_age,
            max_age,
            thumbnail,
            location,
            description,
        };

        console.table(postData);

        // send data in index.js  
        try {
            const { data } = await axios.post('https://assignment11server-phi.vercel.app/addVolunteerPost', postData)
            console.log(data);
            toast.success("Your job has been added successfully!!!!.")
            // navigate('/myPostedJobs')
        } catch (err) {
            console.log(err);
        }

    };



    return (
        <div className='flex justify-center items-center  min-h-[calc(100vh-306px)] my-12'>
            <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md w-[1090px] h-[1100px] '>
                <h2 className='text-4xl font-bold  mb-8 mt-10 text-center bg-yellow-200 text-gray-700 capitalize '>
                   Post Here Your Voluteer Requirements
                </h2>
                {/* <div className="flex justify-center">
                    <img className="h-[250px] pb-6 " src={img} alt="" />
                </div> */}

                <form onSubmit={handleFormSubmission} className="border-2 border-red-500 p-5 pt-10">
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 '>
                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='job_title'>
                                Position Title
                            </label>
                            <input
                                id='position_title'
                                name='position_title'
                                type='text'
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
                                type='email'
                                name='email'
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
                                // defaultValue={user?.email}
                           
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
                            <label className='text-gray-700 text-xl font-bold' htmlFor='min_price'>
                                Minimum Age
                            </label>
                            <input
                                id='min_age'
                                name='min_age'
                                type='number'
                                placeholder="18 Years"
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 text-xl font-bold' htmlFor='max_price'>
                                Maximum Age
                            </label>
                            <input
                                id='max_age'
                                name='max_age'
                                type='number'
                                placeholder="65 Years"
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div>
                            <label className='text-gray-700 text-xl font-bold ' htmlFor='max_price'>
                                Thumbnail
                            </label>
                            <input
                                id='thumbnail'
                                name='thumbnail'
                                type='text'
                                required
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
                                required
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
                            required
                            placeholder="Write Here Your Job Requiremnts....."
                        ></textarea>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className='px-16 py-5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-purple-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                            Add Post
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddVolunteer;