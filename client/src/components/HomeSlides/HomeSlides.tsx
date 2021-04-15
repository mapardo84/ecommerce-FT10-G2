import { Carousel } from 'antd';
import { supabase } from '../../SupaBase/conection';
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
                    <img className="slidesImages" src='./images/slide3.jpg' alt="Img not found"/>
                    <div className="slidesText">
                        Convenience and comfort 
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src='./images/slide2.jpg' alt="Img not found"/>
                    <div className="slidesText">
                    Beach and relaxation 
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src='./images/slide5.jpg' alt="Img not found"/>
                    <div className="slidesText">
                        An oasis for you.
                    </div>
                </div>

                <div className="slideContainer">
                    <img className="slidesImages" src='./images/slide4.jpg' alt="Img not found"/>
                    <div className="slidesText">
                        The getaway you need
                    </div>
                </div>

            </Carousel>
        </div >
    )
}

export default HomeSlides


