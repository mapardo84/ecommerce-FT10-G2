import React, { useEffect } from 'react'
import "./HomeDescription.less"
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeDescription = () => {

    useEffect(() => {
        AOS.init();
    }, []);
    

    return (
        <div className="homeDescription_Container">
            <div className="homeDescription_Row1">

                <div className="homeDescription_Title1">
                    HENRY HOTEL
                </div>

                <div className="homeDescription_Text1">
                    The Henry Hotel on Miami Beach, in South Beach, Florida, is in an incredible location, overlooking more than 200 feet of beautiful white sandy tropical beaches on the Atlantic Ocean.
                </div>

            </div>

            <div className="homeDescription_Row2">

                <div className="homeDescription_left">
                    <img data-aos="fade-up" data-aos-duration="2000"  data-aos-once="true" className="homeDescription_image"  src='./images/home3.jpg' alt="Img not found" />
                    <div className="homeDescription_Text2">
                        it is perfect for romantic getaways, family vacations, spectacular
                        reunions and events. Unplug and relax with a poolside drink, soak
                        up some sun on the sand, or enjoy a relaxing spa massage or one of
                        our Mayan-inspired treatments.
                        <br /><br />
                         Adventurers will want to explore
                        ancient sites and natural treasures, snorkel through colorful
                        reefs teeming with tropical fish, swim with turtles, discover the
                        magic of cenotes, our Dive Center has been open for more than 35
                        years. meet friendly people in the city.
                    </div>
                </div>
                <div className="homeDescription_right"  data-aos="fade-up" data-aos-once="true" data-aos-duration="1000">
                    <div className="homeDescription_Title2" >About</div>
                    <div className="homeDescription_Text3" >
                        Built in 2009 and completely renovated in 2018, our modern Miami
                        hotel offers the highest levels of luxury and comfort. Our leisure
                        facilities include two hot tubs, a state of the art gym with
                        unbeatable panoramic sunset views.
                    </div>
                    <img className="homeDescription_image2" src='./images/home2.jpg' alt="Img not found" />
                    <img  className="homeDescription_image3" src='./images/home1.jpg' alt="Img not found" />
                </div>
            </div>
        </div>
    )
}

export default HomeDescription

// <div className="titleHotel">HENRY HOTEL</div>
// <h3 className="subtitle">
//     {" "}
//   A luxurious hotel, open the door to a whole new world.
// </h3>{" "}
// <h3 className="subtitle2">
//     {" "}
//   Feel the difference and prepare for a beautiful traveling
//   experience.
// </h3>
// <h4 className="description">
//     The Henry Hotel on Miami Beach in South Beach, Florida is in an
//     amazing location, overlooking more than 200 feet of beautiful
//   white sandy tropical beaches on the Atlantic Ocean.{" "}
// </h4>

// <h4 className="description">
//     Built in 2009 and completely renovated in 2018, our modern Miami
//     hotel offers the highest levels of luxury and comfort. Our leisure
//     facilities include two hot tubs, a state of the art gym with
//     unbeatable panoramic sunset views, as well as three different
//     swimming pools, including 2 beach level family pools and our top
//     floor tranquility pool adults only offering something for every
//     guest.
// </h4>
// <h4 className="description">
//     it is perfect for romantic getaways, family vacations, spectacular
//     reunions and events. Unplug and relax with a poolside drink, soak
//     up some sun on the sand, or enjoy a relaxing spa massage or one of
//     our Mayan-inspired treatments. Adventurers will want to explore
//     ancient sites and natural treasures, snorkel through colorful
//     reefs teeming with tropical fish, swim with turtles, discover the
//     magic of cenotes, our Dive Center has been open for more than 35
//     years. meet friendly people in the city.
// </h4>
// <div className="description">
//     Accommodations
//     Whether visiting for work or relaxation, The Henry Hotel offers a
//     wide range of comfort and convenience to accommodate our valued
//     guests.
// </div>