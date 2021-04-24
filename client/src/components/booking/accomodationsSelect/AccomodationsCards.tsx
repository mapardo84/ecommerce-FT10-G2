import { Button, Layout, Image, Modal, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../accomodationsSelect/AccomodationsCards.less'

const { Sider, Content } = Layout;

export const AccomodationsCards = (props: any): JSX.Element => {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false) };
    const handleCancel = () => { setIsModalVisible(false) };

    const { categ, key, types, beds } = props

    useEffect(() => {
    }, [])
    return (

        <div>
            <div className="newGlobalCategory">

                <div className="newCategory_Container">

                    <img className="newImageCategory" src={categ.images[0]} />

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

                                <div style={{display:"flex", alignItems:"center", marginBottom:"5px"}}>
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





