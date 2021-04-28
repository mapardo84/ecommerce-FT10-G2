import { Button, Carousel } from 'antd';
import { NavLink } from 'react-router-dom';
import "./HomeSlides.less"



export const HomeSlides = () => {



    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
    };

    return (

        <div className="containerSlide">

            <div>
                <div className="sliceTitle">We have the best destination</div>
                <div className="sliceDescription">
                    We have the best destination e have the best destination
                  </div>
                <div className="sliceButton">
                    <NavLink to="/booking"><Button type="primary" size="large">BOOK NOW</Button></NavLink>
                </div>
            </div>

            <Carousel {...settings} >
                <div className="slideContainer">
                    <img className="slidesImages" src='./images/slide0.jpg' alt="Img not found" />
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src='./images/slide04.jpg' alt="Img not found" />
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src='./images/slide07.jpg' alt="Img not found" />
                </div>

            </Carousel>
        </div >
    )
}

export default HomeSlides


