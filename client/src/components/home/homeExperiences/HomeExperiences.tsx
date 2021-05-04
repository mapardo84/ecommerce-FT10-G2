import { Carousel } from 'antd';
import wedding from './img/wedding.jpg'
import events from './img/events.jpg'
import diving from './img/diving.jpg'
import './HomeExperiences.less'
import '../antClass.less'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
};


export const HomeExperiences = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    
    return (
        <div  data-aos="fade" data-aos-once="true" data-aos-duration="1000" className='containerHomeExperiences'>
            <Carousel dotPosition="right" effect="fade" {...settings}>
                <div className='img-text-HomeExperiences' >
                    <div className='containerWordsExperiences'>
                        <div className='titleHomeExp' >WEDDING</div>
                        <div className='descriptionHomeExp'>Inside our spaces you will be able to make your dreams come true, living in any of our rooms the longed if you have waited... let our hotel accompany you in such an important moment in your life. </div></div>
                    <img className='imgExperience' src={wedding} alt='owww image not found :(' />
                </div>
                <div className='img-text-HomeExperiences'>
                    <div className='containerWordsExperiences'>
                        <div className='titleHomeExp' >EVENTS</div>
                        <div className='descriptionHomeExp'>We have different spaces, where you can hold conferences, lectures, events, or any type of informal or business event, just fill out the form and we will contact you. </div></div>
                    <img className='imgExperience' src={events} alt='owww image not found :(' />
                </div>
                <div className='img-text-HomeExperiences'>
                    <div className='containerWordsExperiences'>
                        <div className='titleHomeExp' >DIVING</div>
                        <div className='descriptionHomeExp'>Diving, one of the many activities that you can do around our hotel, live the experience of knowing the sea a little more in depth, make new friends and spend unforgettable moments.</div></div>
                    <img className='imgExperience' src={diving} alt='owww image not found :(' />
                </div>
            </Carousel>


        </div>
    )
}


