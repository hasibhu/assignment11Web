import { Link, useLoaderData } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
// import DatePicker from "react-datepicker";

// import { useState } from "react";


const VolunteerJobDetails = () => {
    const { user } = UseAuth();
    // const [startDate, setStartDate] = useState(new Date());
    const jobData = useLoaderData();
  
    // console.log(jobData); 
    const { _id, position_title, category, description, organizer_email, thumbnail, numberOfVolunteer, max_age, min_age, location, deadline } = jobData ||{};

    

    // buyer email work at part5 40min


    return (
        <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-lg mx-auto '>

            {/* Job Details */}
            <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
                <div className='flex items-center justify-between'>
                    <span className='text-xl font-bold  text-red-700 bg-gray-400  rounded-xl '>
                        Deadline: {deadline}
                    </span>
                    <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
                        {category}
                    </span>
                </div>

                <div>
                    <h1 className=' text-3xl text-center mt-8 mb-6 font-semibold text-gray-800 '>
                        Position Title: {position_title}
                    </h1>
                    <img className="m-auto " src={thumbnail} alt="" />
                    <p className="text-xl text-center  mt-6">Job Description</p>
                    <p className='mt-2 text-lg lg:w-[650px] text-center m-auto text-gray-600 '>
                         {description}
                    </p>
                    <p className='mt-6  font-bold text-center text-gray-600 '>
                        Organizer Details:
                    </p>
                    <div className='flex flex-col items-center gap-5'>
                        <div>
                            <p className='mt-2 text-sm  text-gray-600 '>Organizer Name: {user?.displayName}</p>
                            <p className='mt-2 text-sm  text-gray-600 '>
                                Email: {organizer_email}
                            </p>
                            <p className="text-center">Working Location: {location}</p>
                            <p>Number of Positions: {!numberOfVolunteer  ? 'Application is Closed' :`${numberOfVolunteer}` } </p>
                        </div>
                        
                        <p className='mt-6 text-lg font-bold text-gray-600 '>
                            Age Range: {min_age} - {max_age}
                        </p>
                    </div>
                    

                    <Link className="flex justify-center mt-8" to={`/applyPosition/${_id}`}> <button className="btn btn-accent w-36 h-16">Be a Volunteer</button></Link>
                </div>
            </div>


          
        </div>
    )
}

export default VolunteerJobDetails;



