import React, { useEffect } from 'react'
import { promotionType } from '../../../actions/Promotions/promotionsAction'
import "./HomeDiscounts.less"
import { Button, Carousel } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
};

const HomeDiscounts = (props: { promo: promotionType[] }) => {

    useEffect(() => {
        AOS.init();
    }, []);

    const discounts = useSelector((state: any) => state.discount.discounts)
    console.log("DIS:", discounts)

    const { promo } = props;

    return (
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" className="HomeDiscounts_container">
            <div className="HomeDiscounts_left">
                <Carousel  {...settings} className="HomeDiscounts_Carousel">

                    {discounts.map((p: promotionType) => {
                        return (
                            <div className="DiscountsCardContainer">

                                <div className="HomeDiscounts_card">
                                    <div className="HomeDiscounts_cardLeft"></div>
                                    <div className="HomeDiscounts_cardContent">

                                        <div className="DiscountCardRow1">{p.categoryToApply.name}</div>
                                        <div className="DiscountCardRow2">{p.value}% OFF</div>
                                        <div className="DiscountCardRow3">{p.description}</div>
                                        <div className="DiscountCardRow4">Expiration: {p.expirationDate}</div>

                                    </div>
                                    <div className="HomeDiscounts_cardRight"></div>
                                </div>

                            </div>
                        )
                    })}
                </Carousel>
            </div>
            <div className="HomeDiscounts_right">
                <div className="HomeDiscounts_rightTitle">DISCOUNTS</div>
                <div className="HomeDiscounts_rightText">Take advantage of our great discounts and get the rest you deserve </div>
                <div><NavLink to="/booking"><Button type="primary" style={{marginBottom:"20px"}}>BOOK NOW</Button></NavLink></div>
            </div>

        </div>
    )
}

export default HomeDiscounts


// categoryToApply:
// name: "Suite"
// __proto__: Object
// description: "Descuento por 2 dias"
// expirationDate: "2021-04-30"
// id: 3
// published: true
// releaseDate: "2021-04-28"
// value: 20

