// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

import health1 from '../assets/images/healthCare.jpeg'
import health2 from '../assets/images/healthCare2.jpeg'
import education1 from '../assets/images/education1.jpeg'
import education2 from '../assets/images/education2.jpeg'
import socialService1 from '../assets/images/socialService1.png'
import socialService2 from '../assets/images/socialService2.jpeg'
import wildLife1 from '../assets/images/wildLife1.jpg'
import wildLife2 from '../assets/images/wildLife2.jpeg'



export default function Carousel() {
    return (
        <>
            <div className='border-t-4 mb-8 border-blue-500 rounded-xl   bg-gradient-to-b from-[#8e6363] to-[rgb(21,21,21, 0)]'>
                {/* <h1 className='text-7xl text-gradient-to-b from-[#8ec847] to-[rgb(21,21,21, 0)] text-center m-2'>Volunteer Verse</h1> */}
                <h1 className='text-7xl text-gradient-to-r mt-8 from-[#8ec847] to-[rgba(21,21,21,0)] text-center m-2'><span className='text-lime-600'>V</span>olunteer <span className='text-red-600'>√</span>erse</h1>

                <h1 className='text-center font-bold'>Unite, Serve, Empower: Join Our Volunteer Community Today for an Impactful Change!</h1>
            </div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide
                        text = 'We have world class team to help the vulnarables'
                        image={health1}
                    
                    ></Slide>
                </SwiperSlide>

                <SwiperSlide>
                    <Slide
                        image={health2}
                        text='Work Together and Build a Strong Societry'
                    ></Slide>
                </SwiperSlide>

                <SwiperSlide>
                    <Slide
                        image={education1}
                        text='Together We Are More Strong'
                    ></Slide>
                </SwiperSlide>

                <SwiperSlide>
                    <Slide
                        image={education2}
                        text='Help The Remote Living Children With Your Leasure Time'
                    ></Slide>
                </SwiperSlide>


                <SwiperSlide>
                    <Slide
                        image={socialService1}
                        text='Make Life Time Experience'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={socialService2}
                        text='We Are With Minorities'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={wildLife2}
                        text='We Are Open To Welcome You'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={wildLife1}
                        text='Extend Your Helping Hands'
                    ></Slide>
                </SwiperSlide>
                
            </Swiper>
        </>
    );
}



