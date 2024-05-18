import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../SharedPages/Home";
import AddVolunteer from "../Pages/AddVolunteer";
import NeedVolunteer from "../Pages/NeedVolunteer/NeedVolunteer";
import VolunteerJobDetails from "../Pages/VolunteerJobDetails";
import ApplyForPosition from "../Pages/ApplyForPosition";
import Login from "../Login/Login";
import MyApplication from "../Pages/MyApplication";
import JoinRequest from "../Pages/JoinRequest";
import ManageMyPosts from "../Pages/ManageMyPosts";
import UpdateMyPosts from "../Pages/UpdateMyPosts";
import Reviews from "../SharedPages/Reviews";
import Register from '../Register/Register'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                
            },
            {
                path: '/addVolunteer',
                element: <PrivateRoute><AddVolunteer></AddVolunteer></PrivateRoute>
            },
            {
                path: '/needVolunteer',
                element: <NeedVolunteer></NeedVolunteer>
            },
            
            {
                path: '/volunteerPosts/:id',
                element: <PrivateRoute><VolunteerJobDetails></VolunteerJobDetails></PrivateRoute> ,
                loader: ({ params }) => fetch(`https://assignment11server-phi.vercel.app/volunteerPosts/${params.id}`)
            }, 
            {
                path: '/applyPosition/:id',
                element: <PrivateRoute><ApplyForPosition></ApplyForPosition></PrivateRoute> ,
                loader: ({ params }) => fetch(`https://assignment11server-phi.vercel.app/volunteerPosts/${params.id}`)
            }, 
            {
                path: '/manageMyPosts',
                element: <PrivateRoute><ManageMyPosts></ManageMyPosts></PrivateRoute>  
            },
            {
            
                path: '/update/:id',
                element: <PrivateRoute> <UpdateMyPosts></UpdateMyPosts></PrivateRoute>  ,
                // loader: ({ params }) => fetch(`https://assignment11server-phi.vercel.app/myPosts/${params.id}`)
            
            },
            {
                path: '/myApplication',
                element: <PrivateRoute><MyApplication></MyApplication></PrivateRoute> 
            },
            {
                path: '/joinRequest',
                element: <PrivateRoute> <JoinRequest></JoinRequest></PrivateRoute>
            },
            {
                path: '/reviews',
                element: <Reviews></Reviews>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
            
        ]
       
    },
]);

export default router;