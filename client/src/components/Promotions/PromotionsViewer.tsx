import { Carousel } from 'antd';
import { NavLink } from 'react-router-dom';
import { promotionType } from '../../actions/Promotions/promotionsAction';
import "./PromotionsViewer.less"

export const PromotionsViewer = ( props:{ promo:promotionType[] } ) => {
    const { promo } = props;
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000
    };
    
    return (
        <div className="containerSlide1">
            <Carousel {...settings} className="HomeCarousel1">
                {promo.map( (p:promotionType, i:number) => {
                    return (
                        <NavLink key={i} to='/booking' className='promoLink'>
                            <h1 className='promo'>{p.description}</h1>
                        </NavLink>
                )})}
            </Carousel>
        </div >
    )
}

export default PromotionsViewer;