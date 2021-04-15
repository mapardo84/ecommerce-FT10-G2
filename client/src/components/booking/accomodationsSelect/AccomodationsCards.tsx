import { Button, Layout, Image, Modal } from 'antd';
import { useState } from 'react';
import '../accomodationsSelect/AccomodationsCards.less'
import { useDispatch } from "react-redux";
import { getBookData, stepChange } from '../../../actions/Booking/bookingAction';
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

    let nights:number;
    const dispatch = useDispatch();
    
    const [ date ] = useState<string[]>([]);
  
    const [ pax ] = useState<any>({
      adults:0,
      children:0
    });
  
   
    function handleClickRooms(e:any){
        e.preventDefault();
        dispatch(getBookData(pax, date, nights));
        dispatch(stepChange(2));
      } 

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
                            <h6 className='categoryH3'>Rate: ${categ?.price} USD</h6>
                        </div>
                        <div className="AccButtons">
                             <Button style={{marginBottom:"10px",backgroundColor:"white"}} type="dashed" className="accomodationReserveButton" onClick={showModal}>
                            Learn more..
                    </Button>

                    <Button onClick={handleClickRooms} type="primary">
                            Select
                    </Button>
                        </div>
                       
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





