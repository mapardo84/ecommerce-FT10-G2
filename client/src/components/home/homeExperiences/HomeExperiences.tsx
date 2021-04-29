import { Carousel } from 'antd';
import wedding from './img/wedding.jpg'
import events from './img/events.jpg'
import diving from './img/diving.jpg'
import './HomeExperiences.less'



const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    
};


export const HomeExperiences = () => {
    return (
        <div className='containerHomeExperiences'>
            <Carousel effect="fade" {...settings}>
                <div className='img-text-HomeExperiences' >
                    <div className='containerWordsExperiences'>
                    <div className='titleHomeExp' >WEDDING</div>
                    <div className='descriptionHomeExp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid! Aperiam voluptate incidunt dicta quis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid! Aperiam voluptate incidunt dicta quis</div></div>
                    <img className='imgExperience' src={wedding} alt='owww image not found :('/>
                </div>
                <div  className='img-text-HomeExperiences'>
                <div className='containerWordsExperiences'>
                <div className='titleHomeExp' >EVENTS</div>
                <div className='descriptionHomeExp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid! Aperiam voluptate incidunt dicta quis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid! Aperiam voluptate incidunt dicta quis</div></div>
                <img className='imgExperience' src={events} alt='owww image not found :('/>
                </div>
                <div className='img-text-HomeExperiences'>
                <div className='containerWordsExperiences'>
                <div className='titleHomeExp' >DIVING</div>
                <div className='descriptionHomeExp'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid! Aperiam voluptate incidunt dicta quis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repudiandae temporibus corporis voluptate iusto nam architecto nulla accusantium maxime recusandae dolor neque, blanditiis minima aliquid! Aperiam voluptate incidunt dicta quis</div></div>
                <img className='imgExperience' src= {diving} alt='owww image not found :('/>
                </div>
            </Carousel>


        </div>
    )
}


