import axios from 'axios';
import  { useEffect, useState } from 'react';
import ReviewsCards from './ReviewsCards';
import { Link } from 'react-router-dom';


const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios('https://assignment11server-phi.vercel.app/reviews');
            setReviews(data);
        }
        getData();
    }, []);

    return (
        <div className="mt-10 border-t-4 rounded-xl ">
            <h1 className="text-5xl font-bold text-center mt-16">Review from Our Volunteers</h1>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-3 gap-6 lg:ml-5">
                    {
                        reviews.map(review => <ReviewsCards key={review._id} data={review}></ReviewsCards>)
                    }
                </div>
            </div>

            
        </div>
    );
};

export default Reviews;