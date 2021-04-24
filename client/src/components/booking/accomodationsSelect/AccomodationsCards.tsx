import { Button, Layout, Image, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotions, promotionType } from '../../../actions/Promotions/promotionsAction';
import '../accomodationsSelect/AccomodationsCards.less'

const { Sider, Content } = Layout;

export const AccomodationsCards = (props:any): JSX.Element => {
    
    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(getPromotions());
    }, [])


    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const promo = useSelector( (state:any) => state.promotions )
    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false) };
    const handleCancel = () => { setIsModalVisible(false) };
    const { categ, key, beds} = props;
    const foundProm:promotionType = promo?.find( (p:promotionType) => p.categoryToApply === categ.id);

    
    return (
        <div className='categoryContainer'>
            <Layout className='categoryLayout'>
                <Content className='categoryContent'>
                    <Image src={categ.images[0]} width={600} />
                </Content>
                <Sider width={290} className='categorySider'>
                    <div>
                        {foundProm?
                        <h3 className='categoryH3-Promo'>
                            {categ.name} con descuento de {foundProm.value}%
                        </h3>:
                        <h3 className='categoryH3'>
                            {categ.name}
                        </h3>}
                    </div>

                    <div>
                        <p className='categoryP'>
                            {categ.description}
                        </p>
                    </div>
                    <div key={2} className='categoryButtons'>
                        <div>
                            <h6 className='categoryH3'>Rate: ${categ?.price} USD</h6>
                            {beds? <span className="price">Total Fee: ${beds*categ.price} USD</span>: <span></span>}
                        </div>
                        <div className="AccButtons">
                             <Button key='learn' style={{marginBottom:"10px",backgroundColor:"white", marginRight:"20px"}} type="primary" className="accomodationReserveButton" onClick={showModal}>
                                Learn more..
                            </Button>
                        </div>
                        <Modal title="Amenities" key={key} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <div>
                                <section>
                                    {categ?.details?.map( (detail:string, i:number) => {
                                        return (
                                            <p>
                                                <span key={i+20}>
                                                    - {detail}
                                                </span>
                                            </p>
                                        );
                                    })}
                                </section>
                            </div>
                        </Modal>
                    </div>
                </Sider>
            </Layout>
        </div>
    )
}





