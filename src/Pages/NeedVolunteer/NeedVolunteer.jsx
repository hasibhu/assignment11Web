import { MdOutlineGridView } from "react-icons/md";
import { MdTableRows } from "react-icons/md";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VolunteerJobCard from '../VolunteerJobCard';
import { Link } from 'react-router-dom';

const NeedVolunteer = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [showCards, setShowCards] = useState({}); // Keep track of cards to show for each category
    const [isGridView, setIsGridView] = useState(true); // Track whether the view is grid or table

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios('https://assignment11server-phi.vercel.app/volunteerPosts');
            setJobs(data);
        }
        getData();
    }, []);

    useEffect(() => {
        // Initialize showCards state for each category
        const initialShowCards = {};
        jobs.forEach(job => {
            initialShowCards[job.category] = 2; // Initially show 2 cards for each category
        });
        setShowCards(initialShowCards);
    }, [jobs]);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredJobs([]);
            setSearched(false);
        } else {
            const filtered = jobs.filter(job =>
                job.position_title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredJobs(filtered);
            setSearched(true);
            // Reset showCards to initial state when performing a new search
            const initialShowCards = {};
            filtered.forEach(job => {
                initialShowCards[job.category] = 2;
            });
            setShowCards(initialShowCards);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredJobs([]);
        setSearched(false);
        // Reset showCards to initial state when clearing search
        const initialShowCards = {};
        jobs.forEach(job => {
            initialShowCards[job.category] = 2;
        });
        setShowCards(initialShowCards);
    };

    const handleSeeMore = (category) => {
        setShowCards(prevState => ({
            ...prevState,
            [category]: prevState[category] + 2 // Increment count by 2 for the specified category
        }));
    };

    const toggleView = () => {
        setIsGridView(prevState => !prevState);
    };

    return (
        <Tabs>
            <div className='container px-6 mx-auto mt-8'>
                <h1 className='text-5xl text-center font-bold p-10 relative'>

                    Browse Volunteer Positions By Category

                </h1>
                <p className='text-center p-5'> Explore a diverse array of volunteer opportunities tailored to your interests through our Browse Volunteer Positions By Category feature. Discover meaningful roles in categories such as Health Care, Education, Social Service, and Animal Welfare. Seamlessly navigate through various categories to find the perfect volunteer position that aligns with your passions and skills, empowering you to make a positive impact in your community.</p>
                <div className="flex flex-col justify-center items-center">
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder='Search by position title...'
                        className='w-52 border p-2 rounded-md mb-4 mr-4'
                    />
                    <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                        Search
                    </button>
                    {searchQuery && (
                        <button onClick={clearSearch} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Clear
                        </button>
                    )}
                </div>

                <h1 className='text-center m-10'>
                    {searched
                        ? (filteredJobs.length > 0
                            ? `Based on Your Search, There Are Total ${filteredJobs.length} Offers.`
                            : <span className='text-3xl text-red-600'>No offers match your search criteria</span>)
                        : `Total Offers Available: ${jobs.length}`}
                </h1>

                <TabList>
                    <div className='flex items-center justify-center'>
                        <Tab><h1 className='text-2xl'>Health Care</h1></Tab>
                        <Tab><h1 className='text-2xl'>Education</h1> </Tab>
                        <Tab><h1 className='text-2xl '>Social Service</h1> </Tab>
                        <Tab><h1 className='text-2xl '>Animal Welfare</h1> </Tab>
                    </div>
                </TabList>

                {/* Tab panels for different categories */}
                <TabPanel>
                    {/* Toggle button for Table/Grid view */}
                    <div title="Change View" className='flex justify-center'>
                        <button onClick={toggleView} className='btn btn-secondary'>
                            {isGridView ? <MdTableRows className="text-2xl" /> : <MdOutlineGridView  className="text-2xl"/>}
                        </button>
                    </div>
                    {/* Health Care tab panel */}
                    <div className={isGridView ? 'grid lg:grid-cols-2 gap-4 items-center p-6 lg:w-[890px]' : ''}>
                        {/* Show cards or table based on view mode */}
                        {isGridView ? (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Health Care").slice(0, showCards["Health Care"]) : jobs.filter(job => job.category === "Health Care").slice(0, showCards["Health Care"])).map(job =>
                            <VolunteerJobCard key={job._id} job={job} />
                        ) : (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <span>Deadline</span>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <button className='flex items-center gap-x-2'>
                                                <span>Age Range</span>
                                            </button>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Category
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Description
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                    {jobs.filter(job => job.category === "Health Care").map(myPost => (
                                        <tr key={myPost._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.position_title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.deadline}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.min_age}-{myPost.max_age}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-2'>
                                                    <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
                                                        {myPost.category}
                                                    </p>
                                                </div>
                                            </td>
                                            <td title='' className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost?.description.substring(0, 20)}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>

                                                    <Link title="Update" to={`/volunteerPosts/${myPost?._id}`} >
                                                        <button className='text-gray-500 transition-colors duration-200 btn btn-accent  hover:text-yellow-500 focus:outline-none'>
                                                            Details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {/* Show more button */}
                    <div className='flex justify-center items-center pb-8'>
                        {showCards["Health Care"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Health Care").length : jobs.filter(job => job.category === "Health Care").length) && (
                            <button onClick={() => handleSeeMore("Health Care")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                See More
                            </button>
                        )}
                    </div>
                </TabPanel>

                {/* Education  */}
                <TabPanel>
                    {/* Toggle button for Table/Grid view */}
                    <div title="Change View" className='flex justify-center'>
                        <button onClick={toggleView} className='btn btn-secondary'>
                            {isGridView ? <MdTableRows className="text-2xl" /> : <MdOutlineGridView className="text-2xl" />}
                        </button>
                    </div>
                    <div className={isGridView ? 'grid lg:grid-cols-2 gap-4 items-center p-6 lg:w-[890px]' : ''}>
                        {/* Show cards or table based on view mode */}
                        {isGridView ? (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Education").slice(0, showCards["Education"]) : jobs.filter(job => job.category === "Education").slice(0, showCards["Education"])).map(job =>
                            <VolunteerJobCard key={job._id} job={job} />
                        ) : (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <span>Deadline</span>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <button className='flex items-center gap-x-2'>
                                                <span>Age Range</span>
                                            </button>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Category
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Description
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                        {jobs.filter(job => job.category === "Education").map(myPost => (
                                        <tr key={myPost._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.position_title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.deadline}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.min_age}-{myPost.max_age}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-2'>
                                                    <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
                                                        {myPost.category}
                                                    </p>
                                                </div>
                                            </td>
                                            <td title='' className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost?.description.substring(0, 20)}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>

                                                    <Link title="Update" to={`/volunteerPosts/${myPost?._id}`} >
                                                        <button className='text-gray-500 transition-colors duration-200 btn btn-accent  hover:text-yellow-500 focus:outline-none'>
                                                            Details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {/* Show more button */}
                    <div className='flex justify-center items-center pb-8'>
                        {showCards["Education"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Education").length : jobs.filter(job => job.category === "Education").length) && (
                            <button onClick={() => handleSeeMore("Education")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                See More
                            </button>
                        )}
                    </div>
                </TabPanel>


                {/* Social Service  */}
                <TabPanel>
                    {/* Toggle button for Table/Grid view */}
                    <div title="Change View" className='flex justify-center'>
                        <button onClick={toggleView} className='btn btn-secondary'>
                            {isGridView ? <MdTableRows className="text-2xl" /> : <MdOutlineGridView className="text-2xl" />}
                        </button>
                    </div>
                    <div className={isGridView ? 'grid lg:grid-cols-2 gap-4 items-center p-6 lg:w-[890px]' : ''}>
                        {/* Show cards or table based on view mode */}
                        {isGridView ? (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Social Service").slice(0, showCards["Social Service"]) : jobs.filter(job => job.category === "Social Service").slice(0, showCards["Social Service"])).map(job =>
                            <VolunteerJobCard key={job._id} job={job} />
                        ) : (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <span>Deadline</span>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <button className='flex items-center gap-x-2'>
                                                <span>Age Range</span>
                                            </button>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Category
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Description
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                        {jobs.filter(job => job.category === "Social Service").map(myPost => (
                                        <tr key={myPost._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.position_title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.deadline}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.min_age}-{myPost.max_age}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-2'>
                                                    <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
                                                        {myPost.category}
                                                    </p>
                                                </div>
                                            </td>
                                            <td title='' className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost?.description.substring(0, 20)}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>

                                                    <Link title="Update" to={`/volunteerPosts/${myPost?._id}`} >
                                                        <button className='text-gray-500 transition-colors duration-200 btn btn-accent  hover:text-yellow-500 focus:outline-none'>
                                                            Details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {/* Show more button */}
                    <div className='flex justify-center items-center pb-8'>
                        {showCards["Social Service"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Social Service").length : jobs.filter(job => job.category === "Social Service").length) && (
                            <button onClick={() => handleSeeMore("Social Service")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                See More
                            </button>
                        )}
                    </div>
                </TabPanel>


                {/* Animal Welfare  */}
                <TabPanel>
                    {/* Toggle button for Table/Grid view */}
                    <div title="Change View" className='flex justify-center'>
                        <button onClick={toggleView} className='btn btn-secondary'>
                            {isGridView ? <MdTableRows className="text-2xl" /> : <MdOutlineGridView className="text-2xl" />}
                        </button>
                    </div>
                    <div className={isGridView ? 'grid lg:grid-cols-2 gap-4 items-center p-6 lg:w-[890px]' : ''}>
                        {/* Show cards or table based on view mode */}
                        {isGridView ? (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Animal Welfare").slice(0, showCards["Animal Welfare"]) : jobs.filter(job => job.category === "Animal Welfare").slice(0, showCards["Animal Welfare"])).map(job =>
                            <VolunteerJobCard key={job._id} job={job} />
                        ) : (
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <span>Deadline</span>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            <button className='flex items-center gap-x-2'>
                                                <span>Age Range</span>
                                            </button>
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Category
                                        </th>
                                        <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Description
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                        {jobs.filter(job => job.category === "Animal Welfare").map(myPost => (
                                        <tr key={myPost._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.position_title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.deadline}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost.min_age}-{myPost.max_age}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-2'>
                                                    <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
                                                        {myPost.category}
                                                    </p>
                                                </div>
                                            </td>
                                            <td title='' className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {myPost?.description.substring(0, 20)}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>

                                                    <Link title="Update" to={`/volunteerPosts/${myPost?._id}`} >
                                                        <button className='text-gray-500 transition-colors duration-200 btn btn-accent  hover:text-yellow-500 focus:outline-none'>
                                                            Details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {/* Show more button */}
                    <div className='flex justify-center items-center pb-8'>
                        {showCards["Animal Welfare"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Animal Welfare").length : jobs.filter(job => job.category === "Animal Welfare").length) && (
                            <button onClick={() => handleSeeMore("Animal Welfare")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                See More
                            </button>
                        )}
                    </div>
                </TabPanel>
                
            </div>
        </Tabs>
    );
};

export default NeedVolunteer;





















































// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import VolunteerJobCard from '../VolunteerJobCard';
// import { Link } from 'react-router-dom';

// const NeedVolunteer = () => {
//     const [jobs, setJobs] = useState([]);
//     const [filteredJobs, setFilteredJobs] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searched, setSearched] = useState(false);
//     const [showCards, setShowCards] = useState({}); // Keep track of cards to show for each category

//     useEffect(() => {
//         const getData = async () => {
//             const { data } = await axios('https://assignment11server-phi.vercel.app/volunteerPosts');
//             setJobs(data);
//         }
//         getData();
//     }, []);

//     useEffect(() => {
//         // Initialize showCards state for each category
//         const initialShowCards = {};
//         jobs.forEach(job => {
//             initialShowCards[job.category] = 2; // Initially show 2 cards for each category
//         });
//         setShowCards(initialShowCards);
//     }, [jobs]);

//     const handleSearch = () => {
//         if (searchQuery.trim() === '') {
//             setFilteredJobs([]);
//             setSearched(false);
//         } else {
//             const filtered = jobs.filter(job =>
//                 job.position_title.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredJobs(filtered);
//             setSearched(true);
//             // Reset showCards to initial state when performing a new search
//             const initialShowCards = {};
//             filtered.forEach(job => {
//                 initialShowCards[job.category] = 2;
//             });
//             setShowCards(initialShowCards);
//         }
//     };

//     const clearSearch = () => {
//         setSearchQuery('');
//         setFilteredJobs([]);
//         setSearched(false);
//         // Reset showCards to initial state when clearing search
//         const initialShowCards = {};
//         jobs.forEach(job => {
//             initialShowCards[job.category] = 2;
//         });
//         setShowCards(initialShowCards);
//     };

//     const handleSeeMore = (category) => {
//         setShowCards(prevState => ({
//             ...prevState,
//             [category]: prevState[category] + 2 // Increment count by 2 for the specified category
//         }));
//     };

//     return (
//         <Tabs>
//             <div className='container px-6 mx-auto mt-8'>
//                 <h1 className='text-5xl text-center font-bold p-10 relative'>

//                     Browse Volunteer Positions By Category


//                 </h1>
//                 <p className='text-center p-5'> Explore a diverse array of volunteer opportunities tailored to your interests through our Browse Volunteer Positions By Category feature. Discover meaningful roles in categories such as Health Care, Education, Social Service, and Animal Welfare. Seamlessly navigate through various categories to find the perfect volunteer position that aligns with your passions and skills, empowering you to make a positive impact in your community.</p>
//                 <div className="flex flex-col justify-center items-center">
//                     <input
//                         type='text'
//                         value={searchQuery}
//                         onChange={e => setSearchQuery(e.target.value)}
//                         placeholder='Search by position title...'
//                         className='w-52 border p-2 rounded-md mb-4 mr-4'
//                     />
//                     <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
//                         Search
//                     </button>
//                     {searchQuery && (
//                         <button onClick={clearSearch} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
//                             Clear
//                         </button>
//                     )}
//                 </div>

//                 <h1 className='text-center m-10'>
//                     {searched
//                         ? (filteredJobs.length > 0
//                             ? `Based on Your Search, There Are Total ${filteredJobs.length} Offers.`
//                             : <span className='text-3xl text-red-600'>No offers match your search criteria</span>)
//                         : `Total Offers Available: ${jobs.length}`}
//                 </h1>

//                 <TabList>
//                     <div className='flex items-center justify-center'>
//                         <Tab><h1 className='text-2xl'>Health Care</h1></Tab>
//                         <Tab><h1 className='text-2xl'>Education</h1> </Tab>
//                         <Tab><h1 className='text-2xl '>Social Service</h1> </Tab>
//                         <Tab><h1 className='text-2xl '>Animal Welfare</h1> </Tab>
//                     </div>
//                 </TabList>

//                 {/* healthCare advertisement  */}
//                 <TabPanel className='bg-yellow-100 '>
//                     <div>
//                         <div className='flex justify-end'>
//                             <button className='btn btn-secondary'>Table</button>
//                             <button className='btn btn-secondary ml-5'>Grid</button>
//                         </div>

//                         <div>
//                             <section className='container px-4 mx-auto pt-12'>
//                                 <div className='flex flex-col mt-6'>
//                                     <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
//                                         <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
//                                             <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
//                                                 <table className='min-w-full divide-y divide-gray-200'>
//                                                     <thead className='bg-gray-50'>
//                                                         <tr>
//                                                             <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
//                                                                 <div className='flex items-center gap-x-3'>
//                                                                     <span>Title</span>
//                                                                 </div>
//                                                             </th>
//                                                             <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
//                                                                 <span>Deadline</span>
//                                                             </th>
//                                                             <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
//                                                                 <button className='flex items-center gap-x-2'>
//                                                                     <span>Age Range</span>
//                                                                 </button>
//                                                             </th>
//                                                             <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
//                                                                 Category
//                                                             </th>
//                                                             <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
//                                                                 Description
//                                                             </th>
//                                                             <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
//                                                                 Actions
//                                                             </th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody className='bg-white divide-y divide-gray-200 '>
//                                                         {jobs.map(myPost => (
//                                                             <tr key={myPost._id}>
//                                                                 <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
//                                                                     {myPost.position_title}
//                                                                 </td>
//                                                                 <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
//                                                                     {myPost.deadline}
//                                                                 </td>
//                                                                 <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
//                                                                     {myPost.min_age}-{myPost.max_age}
//                                                                 </td>
//                                                                 <td className='px-4 py-4 text-sm whitespace-nowrap'>
//                                                                     <div className='flex items-center gap-x-2'>
//                                                                         <p className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'>
//                                                                             {myPost.category}
//                                                                         </p>
//                                                                     </div>
//                                                                 </td>
//                                                                 <td title='' className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
//                                                                     {myPost?.description.substring(0, 20)}
//                                                                 </td>
//                                                                 <td className='px-4 py-4 text-sm whitespace-nowrap'>
//                                                                     <div className='flex items-center gap-x-6'>
                                                                        
//                                                                         <Link title="Update" to={`/volunteerPosts/${myPost?._id}`} >
//                                                                             <button className='text-gray-500 transition-colors duration-200 btn btn-accent  hover:text-yellow-500 focus:outline-none'>
//                                                                                 Details
//                                                                             </button>
//                                                                         </Link>
//                                                                     </div>
//                                                                 </td>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//                         </div>

//                         <div className='grid lg:grid-cols-2 gap-4 items-center  p-6 lg:w-[890px]  '>
//                             {(searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Health Care").slice(0, showCards["Health Care"]) : jobs.filter(job => job.category === "Health Care").slice(0, showCards["Health Care"])).map(job =>
//                                 <VolunteerJobCard key={job._id} job={job} />
//                             )}


//                         </div>
//                     </div>
//                     {/* show more button */}
//                     <div className='flex justify-center items-center pb-8'>
//                         {showCards["Health Care"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Health Care").length : jobs.filter(job => job.category === "Health Care").length) && (
//                             <button onClick={() => handleSeeMore("Health Care")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
//                                 See More
//                             </button>
//                         )}
//                     </div>
//                 </TabPanel>

                




//                 {/* Education  advertisement */}
//                 <TabPanel>
//                     <div className='grid grid-cols-2 gap-4'>
//                         {(searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Education").slice(0, showCards["Education"]) : jobs.filter(job => job.category === "Education").slice(0, showCards["Education"])).map(job =>
//                             <VolunteerJobCard key={job._id} job={job} />
//                         )}
//                     </div>
//                     {showCards["Education"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Education").length : jobs.filter(job => job.category === "Education").length) && (
//                         <button onClick={() => handleSeeMore("Education")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
//                             See More
//                         </button>
//                     )}
//                 </TabPanel>

//                 {/* Social Service advertisement */}
//                 <TabPanel>
//                     <div className='grid grid-cols-2 gap-4'>
//                         {(searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Social Service").slice(0, showCards["Social Service"]) : jobs.filter(job => job.category === "Social Service").slice(0, showCards["Social Service"])).map(job =>
//                             <VolunteerJobCard key={job._id} job={job} />
//                         )}
//                     </div>
//                     {showCards["Social Service"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Social Service").length : jobs.filter(job => job.category === "Social Service").length) && (
//                         <button onClick={() => handleSeeMore("Social Service")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
//                             See More
//                         </button>
//                     )}
//                 </TabPanel>

//                 {/* Animal welfare advertisement */}
//                 <TabPanel>
//                     <div className='grid grid-cols-2 gap-4'>
//                         {(searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Animal WelFare").slice(0, showCards["Animal WelFare"]) : jobs.filter(job => job.category === "Animal WelFare").slice(0, showCards["Animal WelFare"])).map(job =>
//                             <VolunteerJobCard key={job._id} job={job} />
//                         )}
//                     </div>
//                     {showCards["Animal WelFare"] < (searched && filteredJobs.length > 0 ? filteredJobs.filter(job => job.category === "Animal WelFare").length : jobs.filter(job => job.category === "Animal WelFare").length) && (
//                         <button onClick={() => handleSeeMore("Animal WelFare")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
//                             See More
//                         </button>
//                     )}
//                 </TabPanel>
//             </div>
//         </Tabs>
//     );
// };

// export default NeedVolunteer;
