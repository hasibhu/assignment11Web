import React from 'react';

const ReviewCard = ({ data }) => {
    const { volunteer_id, name, review, working_area, email, additional_info  } = data;
    return (
        <div className='border border-red-700 rounded-xl p-2'>
            <h1><span className='text-xl font-extrabold'>Volunteer ID:</span > {volunteer_id}</h1>

            <h2><span className='text-xl font-extrabold'> Name:</span> {name}</h2>

            <h2><span className='text-xl font-extrabold'>Email:</span> {email}</h2>

            <h2><span className='text-xl font-extrabold'>Specialization:</span> {working_area}</h2>
            
            <h2><span className='text-xl font-extrabold'>Review:</span> {review}</h2>
            <h2><span className='text-xl font-extrabold'>Outstanding Job:</span> {additional_info}</h2>
        </div>
    );
};

export default ReviewCard;