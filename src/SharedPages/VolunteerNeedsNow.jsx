import axios from "axios";
import { useEffect, useState } from "react";
import VolunteerNeedNowCard from '../SharedPages/VolunteerNeedNowCard'
import { Link } from "react-router-dom";

const VolunteerNeedsNow = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('https://assignment11server-phi.vercel.app/volunteerPostsBySort');
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error); 
                setError("Failed to fetch posts. Please try again later.");
            }
        }
        getData();
    }, []);

    return (
        <div className="mt-16 border-t-4 border-yellow-500 pt-6 rounded-xl">
            <h2 className="text-5xl font-bold text-center mb-6 bg-yellow-300">Volunteer Needs Now</h2>
            <p className="text-center font-bold pb-8">Empower Change Today: Explore Urgent Volunteer Opportunities to Make an Impact Now!</p>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-3 gap-6 lg:ml-5">
                {posts.slice(0, 6).map(post => (
                    <VolunteerNeedNowCard key={post._id} post={post}></VolunteerNeedNowCard>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <Link to='/needVolunteer'>
                    <button className="btn btn-secondary">Show All</button>
                </Link>
            </div>
        </div>
    );
};

export default VolunteerNeedsNow;

