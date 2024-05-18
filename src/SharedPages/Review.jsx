import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Link } from 'react-router-dom';

const Review = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios('https://assignment11server-phi.vercel.app/reviews');
            setReviews(data);
        }
        getData();
    }, []);



    return (
        <div className="mt-10 border-t-4 border-blue-800 rounded-xl ">
            <h1 className="text-5xl font-bold text-center mt-16 mb-8 text-red-700">Review from Our Volunteers </h1>
            <p className='text-center font-bold text-lime-700'>Here are some reviews from our previous successfull volunteers </p>
            <div className='border-4 border-blue-600 p-4 rounded-xl m-2'>
                <div className='flex justify-center items-center '>
                    <div className="grid grid-cols-3 gap-6 lg:ml-5">
                        {
                            reviews.slice(0, 6).map(review => <ReviewCard key={review._id} data={review}></ReviewCard>)
                        }
                    </div>
                </div>

                <div className='flex justify-center items-center mt-8'>
                    <Link to='/reviews'><button className='btn btn-warning'>View All Reviews</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Review;