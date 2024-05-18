import { Link } from "react-router-dom";


const Donation = () => {
    return (
        <div className="mt-10 border-t-4 border-blue-700 rounded-xl">
            <h1 className="text-5xl font-bold text-center mt-16 bg-yellow-400">We Need <span className="text-purple-700">Kind Hearted</span> People <br /> to <span className="text-lime-500">Support</span> Our Work</h1>
            <h2 className="text-center text-xl p-6">We are a recognized volunteer organization and receive funds worldwide.</h2>
            <h2 className="text-center text-xl p-2">Please <Link className="text-purple-600" to='/register'>register</Link> to be a valuable donor.  </h2>
            <div className="flex items-center justify-center">
                <img src={'https://i.ibb.co/KsGxW5z/network.jpg'} alt="" />
            </div>
            
        </div>
    );
};

export default Donation;