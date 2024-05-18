// import MyBids from "../Pages/MyBids";
// import { useLoaderData } from 'react-router-dom';
import Carousel from '../SharedPages/Carousel'
import Award from './Award';
import Donation from './Donation';
// import PreviousVolunteers from './PreviousVolunteers';
import Review from './Review';
import Share from './Share';
import VolunteerNeedsNow from './VolunteerNeedsNow';



const Home = () => {
    // const jobs = useLoaderData();
    // console.log(jobs);
    return (
        <div className='mt-10'>
           
            <Carousel></Carousel>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <Award></Award>
            {/* <PreviousVolunteers></PreviousVolunteers> */}
            <Donation></Donation>
            <Review></Review>
            <Share></Share>
            
            </div>
    );
};

export default Home;