import React from 'react'
import { Carousel } from 'antd';

import slide2 from './images/slide2.jpg';
import slide3 from './images/slide3.jpg';
import slide4 from './images/slide4.jpg';
import slide5 from './images/slide5.jpg';

import "./HomeSlides.less"

const HomeSlides = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className="font">
            <Carousel {...settings} className="HomeCarousel">

                <div className="slideContainer">
                    <img className="slidesImages" src={slide3} />
                    <div className="slidesText">
                        Lorem ipsum dolor sit amet
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src={slide2} />
                    <div className="slidesText">
                        Lorem ipsum dolor sit amet
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src={slide5} />
                    <div className="slidesText">
                        Lorem ipsum dolor sit amet
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src={slide4} />
                    <div className="slidesText">
                        Lorem ipsum dolor sit amet
                    </div>
                </div>

            </Carousel>
        </div >
    )
}

export default HomeSlides


