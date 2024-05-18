import { Link } from "react-router-dom";



const VolunteerJobCard = ({ job }) => {
    // console.log(job);
    const {
        _id,
        position_title,
        organizer_name,
        organizer_email,
        category,
        deadline,
        min_age,
        max_age,
        thumbnail,
        location,
        description,
    } = job || {};


    return (
        
        <Link to={`/volunteerPosts/${_id}`} className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'>
            <div className='flex items-center justify-between'>
                <span className='text-xs font-light text-gray-800 '>
                    Deadline: {deadline}
                </span>
                <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
                    {category}

                </span>
            </div>

            <div>
                <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                    {position_title}

                </h1>

                <div className="flex justify-between">
                    <p title={description} className='mt-2 text-sm text-gray-600 '>
                        {description.substring(0, 40)}...
                    </p>
                    <img className="w-28 h-22" src={thumbnail} alt="" />
                </div>
                <p className='mt-2 text-sm font-bold text-gray-600 '>
                    Age Range: {min_age} - {max_age}
                </p>
            </div>
        </Link>
    )
}

export default VolunteerJobCard;