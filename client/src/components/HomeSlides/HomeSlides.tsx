import React from 'react'
import { Carousel } from 'antd';

import slide2 from './images/slide2.jpg';
import slide3 from './images/slide3.jpg';
import slide4 from './images/slide4.jpg';
import slide5 from './images/slide5.jpg';

import "./HomeSlides.less"

export const HomeSlides = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000
    };

    return (
        <div className="containerSlide">
            <Carousel {...settings} className="HomeCarousel">

                <div className="slideContainer">
                    <img className="slidesImages" src={slide3} alt="asd"/>
                    <div className="slidesText">
                        Convenience and comfort 
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src={slide2} alt="asd"/>
                    <div className="slidesText">
                    Beach and relaxation 
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src={slide5} alt="asd"/>
                    <div className="slidesText">
                        An oasis for you.
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src={slide4} alt="asd"/>
                    <div className="slidesText">
                        The getaway you need
                    </div>
                </div>

            </Carousel>
        </div >
    )
}

export default HomeSlides


