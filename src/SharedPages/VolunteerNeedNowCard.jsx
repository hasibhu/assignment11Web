
import { Link } from 'react-router-dom';

const VolunteerNeedNowCard = ({ post }) => {
    const { _id, deadline, position_title, category, description, thumbnail } = post;
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
            <img className='h-[200px]' src={thumbnail} alt="" />
            <div>
                <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                    {position_title}

                </h1>

                {/* <p title={description} className='mt-2 text-sm text-gray-600 '>
                    {description.substring(0, 40)}...
                </p> */}
                
            </div>
        </Link>
    );
};

export default VolunteerNeedNowCard;