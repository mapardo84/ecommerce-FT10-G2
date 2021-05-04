import { Button, Layout, Image, Modal, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotions, promotionType } from '../../../actions/Promotions/promotionsAction';
import '../accomodationsSelect/AccomodationsCards.less'

const { Sider, Content } = Layout;

export const AccomodationsCards = (props: any): JSX.Element => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPromotions());
    }, [])


    const [isModalVisible, setIsModalVisible] = useState(false);
    const promo = useSelector((state: any) => state.promotions)
    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false) };
    const handleCancel = () => { setIsModalVisible(false) };
    const { categ, key, beds } = props;
    const foundProm: promotionType = promo?.find((p: promotionType) => p.categoryToApply === categ.id);

    return (
        <>
            <div className="category_cardContainer1">

                <div>
                    {foundProm &&
                        <div className="triangleDiscount1">
                            <div className='bookingCardDiscount1'>
                                {foundProm.value}% Off
                                </div>
                        </div>
                    }

                    <img className="category_cardImage1" src={categ.images[0]} alt="IMG NOT FOUND" />
                </div>

                <div className="category_cardWishlist1">
                    <Button onClick={showModal} className="categoryCardButtonsAc1 category_cardButton21" size="large" type='primary'>
                        More Info...
                   </Button>

                    <div >Rate: ${categ?.price} USD</div>
                    <div >{beds ? <div >Total Fee: ${beds * categ.price} USD</div> : <span></span>}</div>

                </div>

                <div className="category_cardRight1">
                    <div className="category_cardName">
                        {categ.name}
                    </div>
                    <div className="category_cardDescription">
                        {categ.description}
                    </div>
                </div>

                <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Do you want to add this category to your Wishlist?</p>
                </Modal>

            </div >


            <Modal title="Amenities" key={key} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                {categ?.details?.map((detail: string, i: number) => {
                    return (
                        <p key={i} className="p-features">
                            <div style={{ display: "flex" }}><div className="numDetailCategory">{i}</div><div className="featuresText">{detail}</div></div>
                        </p>
                    );
                })}
            </Modal>
        </>
    )
}





