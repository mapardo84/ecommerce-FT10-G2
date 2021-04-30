import React from 'react'
import { promotionType } from '../../../actions/Promotions/promotionsAction'
import "./HomeDiscounts.less"
import { Carousel } from 'antd';

const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
};

const HomeDiscounts = (props: { promo: promotionType[] }) => {
    const { promo } = props;

    console.log(promo)
    return (
        <div className="HomeDiscounts_container">
            <div className="HomeDiscounts_left">
                <Carousel  {...settings} className="HomeDiscounts_Carousel">

                    {promo.map((p: promotionType) => {
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
                <div className="HomeDiscounts_rightText">take advantage of our great discounts and take the rest you deserve, take advantage of our great discounts and take the rest you deserve.</div>

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

