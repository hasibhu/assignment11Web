import { Link } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { user, logOut } = UseAuth();
    // Set initial theme based on localStorage or default to 'light'
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // update state on toggle and store theme in localStorage
    const handleToggle = e => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // set theme state in localStorage on mount
    useEffect(() => {
        // add custom data-theme attribute
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className='navbar shadow-sm container px-4 mx-auto flex justify-around bg-slate-300 h-[100px] rounded-xl'>
            <div className=''>
                <div title="Home" className='flex gap-2 items-center'>
                    {/* <img className='w-auto h-7' src='' alt='' /> */}
                    <span className='font-bold'> <Link to='/'><span className="text-3xl text-lime-400 bg-yellow-800 rounded-3xl">Volunteer<span>√</span>erse</span></Link></span>
                </div>
            </div>
            <div >
                <Link to='/'><button className="btn btn-secondary mr-6">Home</button></Link>
                <Link to='/needVolunteer'><button className="btn btn-secondary">Need Volunteer</button></Link>
            </div>

            <div className='flex-none'>
                {
                    !user && <Link to='/login'><button className="btn btn-accent">Login</button></Link>
                }

                {
                    user && <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >

                            <div title={user?.displayName} className='w-10 rounded-full' >
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User'
                                    src={user?.photoURL}
                                />
                            </div>


                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <Link to='/addVolunteer' className='justify-between'>Add Volunteer</Link>
                            </li>
                            <li>
                                <Link to='/manageMyPosts'>Manage My Post</Link>
                            </li>
                            <li>
                                <Link to='/myApplication'>My Volunteer Request</Link>
                            </li>
                            <li>
                                <Link to='/joinRequest'>Requests to Join</Link>
                            </li>
                            <li className='mt-2'>
                                <button onClick={logOut} className='bg-gray-200 block text-center'>Logout</button>
                            </li>
                        </ul>
                    </div>
                }

                <div className="lg:ml-8">
                    <label title="Click to change theme" className='cursor-pointer grid place-items-center'>
                        <input
                            type='checkbox'
                            onChange={handleToggle}
                            checked={theme === 'dark'} // Check if the theme is 'dark' to toggle the checkbox
                            className='toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2 border border-pink-600'
                        />
                        <svg
                            className='col-start-1 row-start-1 stroke-base-100 fill-base-100'
                            xmlns='http://www.w3.org/2000/svg'
                            width='14'
                            height='14'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <circle cx='12' cy='12' r='5' />
                            <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
                        </svg>
                        <svg
                            className='col-start-2 row-start-1 stroke-base-100 fill-base-100'
                            xmlns='http://www.w3.org/2000/svg'
                            width='14'
                            height='14'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
                        </svg>
                    </label>
                </div>
            </div>

        </div>
    )
}

export default Navbar;
