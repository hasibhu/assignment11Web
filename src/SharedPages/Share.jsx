
import { useState } from 'react';
import Swal from 'sweetalert2';
const Share = () => {
    // State to store the email address
    const [email, setEmail] = useState('');

    // Function to handle email input change
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can implement the logic to send the email address to your backend or handle it as needed
        console.log("Email submitted:", email);
        Swal.fire({
            icon: 'success',
            title: ' Successfully Shared!',
            text: 'Thank you for sharing our activity.',
        });
        // Clear the input field after submission
        setEmail('');
    };

    return (
        <div className="newsletter mt-[40px] bg-orange-200 flex flex-col justify-center items-center pb-10 border-t-4 border-red-600 rounded-xl">
            <div className="mt-10 border-t-4 rounded-xl">

                <h1 className="text-5xl font-bold text-center mt-16 text-emerald-500">Share and Broaden Our Network</h1>
                <p className='mt-6 text-xl text-center p-7'>Do you want to share our activity with your friends and family  and perspective volunteer group?</p>
            </div>
           
        
            <form onSubmit={handleSubmit}>
                <label className='mr-2' htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button className='btn btn-success ml-2' type="submit">Share</button>
            </form>
        </div>
    );
};

export default Share;











