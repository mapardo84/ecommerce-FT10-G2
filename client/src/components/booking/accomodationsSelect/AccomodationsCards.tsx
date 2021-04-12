import { Button, Layout, Image, Modal } from 'antd';
import { useState } from 'react';
import '../accomodationsSelect/AccomodationsCards.less'
import 'antd/dist/antd.css';
const { Sider, Content } = Layout


export const AccomodationsCards = ({ categ }: any): JSX.Element => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (

        <div className='categoryContainer'>
            <Layout className='categoryLayout'>
                <Content className='categoryContent'>
                    <Image src={categ.images[0]} width={600} />
                </Content>
                <Sider width={290} className='categorySider'>

                    <div>
                        <h3 className='categoryH3'>
                            {categ.name}
                        </h3>
                    </div>

                    <div>
                        <p className='categoryP'>
                            {categ.description}
                        </p>
                    </div>


                    <div className='categoryButtons'>
                        <div>
                            <h6 className='categoryH3'>Rate: ${categ?.price} usd</h6>
                        </div>
                        <Button type="primary" className="accomodationReserveButton" onClick={showModal}>
                            Learn more..
                    </Button>
                        <Modal title="Amenities" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <div>
                                <section>
                                    {categ?.details?.map((detail: string, i: number) => {
                                        return (
                                            <p>
                                                <span key={i} >
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





