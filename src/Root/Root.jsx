
import { Outlet } from 'react-router-dom';

import Navbar from '../SharedPages/Navbar';
import Footer from '../SharedPages/Footer';

const Root = () => {
    return (
        <div className='m-auto max-w-screen-xl '>
            <Navbar></Navbar>
            <Outlet ></Outlet>

            <Footer></Footer>
            {/* {bg - sky - 500} */}
        </div>
    );
};

export default Root;


// this file is also names as Main.jsx in some project