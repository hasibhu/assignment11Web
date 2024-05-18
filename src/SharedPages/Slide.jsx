
import { Link } from 'react-router-dom';
import './Slide.css';


const Slide = ({image, text}) => {
    return (
        
        <div className="slide-container">
            <img src={image} alt="slide" className="slide-image" />
            <div className="slide-overlay">
                <div className="slide-text text-4xl  text-red-600">{text}</div>
                <Link to='/needVolunteer'><button className="slide-button">Post & Hire Volunteer</button></Link>
            </div>
        </div>
    );
       
};

export default Slide;





