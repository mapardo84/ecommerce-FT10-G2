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


    useEffect(() => {
    }, [])
    return (

        <div>
            <div className="newGlobalCategory">

                <div className="newCategory_Container">

                    <div >
                        {foundProm &&
                            <div className='bookingCardDiscount'>
                             {foundProm.value}% Off
                           </div>
                        }
                        <img className="newImageCategory" src={categ.images[0]} />
                    </div>


                    <div className="newDescription">

                        <div className="containerCategory1">
                            <div className="newDescriptionCategory">
                                {categ.name}
                            </div>

                            <div className="newDescriptionText">
                                {categ.description}
                            </div>
                        </div>

                        <div className="containerCategory2">
                            <div className="containerCategoryBookingSpecial">

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <div className='categoryBookingPrice'>Rate: ${categ?.price} USD</div>
                                    <Button key='learn' style={{ marginBottom: "10px", marginRight: "20px" }} type="primary" onClick={showModal}>
                                        Learn more..
                                    </Button>
                                </div>

                                <div className="AccButtons">
                                    <div className="">{beds ? <div className="categoryBookingFee">Total Fee: ${beds * categ.price} USD</div> : <span></span>}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
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
        </div>
    )
}





