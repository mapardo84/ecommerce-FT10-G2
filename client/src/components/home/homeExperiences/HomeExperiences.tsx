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
        <div  data-aos="fade-up" data-aos-once="true" data-aos-duration="1000" className='containerHomeExperiences'>
            <Carousel dotPosition="right" effect="fade" {...settings}>
                <div className='img-text-HomeExperiences' >
                    <div className='containerWordsExperiences'>
                        <div className='titleHomeExp' >WEDDING</div>
                        <div className='descriptionHomeExp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid!</div></div>
                    <img className='imgExperience' src={wedding} alt='owww image not found :(' />
                </div>
                <div className='img-text-HomeExperiences'>
                    <div className='containerWordsExperiences'>
                        <div className='titleHomeExp' >EVENTS</div>
                        <div className='descriptionHomeExp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid!</div></div>
                    <img className='imgExperience' src={events} alt='owww image not found :(' />
                </div>
                <div className='img-text-HomeExperiences'>
                    <div className='containerWordsExperiences'>
                        <div className='titleHomeExp' >DIVING</div>
                        <div className='descriptionHomeExp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid!</div></div>
                    <img className='imgExperience' src={diving} alt='owww image not found :(' />
                </div>
            </Carousel>


        </div>
    )
}


