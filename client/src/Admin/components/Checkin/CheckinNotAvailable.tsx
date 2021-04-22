import { PageHeader, Descriptions, Tag, Row, Card, Col, Input, InputNumber, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextBookingRoom, getRoomBooking, getPaimentsOfBooking, roomPayments } from '../../actions/checkinActions';
import { Category } from '../Categories/Categories';
import { Room } from '../Rooms/Rooms';
import { IType } from '../Types/Types';
import { getOnePax } from '../../actions/paxesActions';
import { PaxValues } from '../../../components/booking/paxForm/PaxForm';
import moment from 'moment';
import Text from 'antd/lib/typography/Text';


export const CheckinNotAvailable = ({ steps }: { steps: Function }): JSX.Element => {

    const [roomSelected, setRoomSelected] = useState<Room>()
    const [roomCategory, setRoomCategory] = useState<Category>()
    const [roomType, setRoomType] = useState<IType>()
    const [price, setPrice] = useState<number>()
    const [nights, setNights] = useState(0)
    const [lateCheckout, setLateCheckout] = useState(0)
    const [payments, setPayments] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')

    const { categories } = useSelector((state: any) => state.categories)
    const { types } = useSelector((state: any) => state.types)
    const { roomsList } = useSelector((state: any) => state.rooms)
    const { roomId, nextBooking, bookingData, roomPayments } = useSelector((state: any) => state.checkin)
    const { pax }: { pax: PaxValues } = useSelector((state: any) => state.paxes)

    const dispatch = useDispatch()

    useEffect(() => {
        setRoomSelected(roomsList.find((room: Room) => room.id === roomId))
        dispatch(nextBookingRoom(roomId))
    }, [dispatch, roomId, roomsList])

    useEffect(() => {
        setRoomCategory(categories.find((category: Category) => category.id === roomSelected?.category_id))
        setRoomType(types.find((type: IType) => type.id === roomSelected?.type_id))
        //console.log("User in the room: ", roomSelected?.curent_pax)
        //dispatch buscar pax principal de esta habitacion y tambien el booking
        if (roomSelected) {
            dispatch(getOnePax(roomSelected.curent_pax))
            dispatch(getRoomBooking(roomSelected.curent_booking))
            dispatch(getPaimentsOfBooking(roomSelected.curent_booking))
        }
    }, [roomSelected, types, categories])

    useEffect(() => {
        if (roomCategory && roomType) {
            setPrice(roomCategory?.price * roomType?.beds)
        }
        setNights(moment().diff(moment(bookingData.checkin), 'days'))

        let total = 0
        roomPayments.forEach((payment: any) => {
            if (payment.payment_status === 'Approved') {
                total = total + payment.totalPrice
            }
        })
        setPayments(total)

    }, [roomType, roomCategory, bookingData, roomPayments])

    const handleChange = (value: string) => {
        setPaymentMethod(value)
    }

    const handleCheckout = () => {
        //quitar el current_pax y el current_booking cambiar de not available a cleaning

    }



    return (
        <div>
            <br />
            <PageHeader
                className="checkin_site-page-header"
                onBack={() => steps(0)}
                title={roomSelected?.name}
                subTitle={`Floor Number ${roomSelected?.floor}`}
                extra={[
                    <>State: {
                        roomSelected?.availability === 'not available' &&
                        <Tag color='red' key='available' >
                            Not Available
                        </Tag>
                    }
                    </>
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Price">{price} per day</Descriptions.Item>
                    <Descriptions.Item label="Type">
                        {roomType?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">{roomCategory?.name}</Descriptions.Item>
                    <Descriptions.Item label="Next Booking">{nextBooking}</Descriptions.Item>
                    <Descriptions.Item label="Chek-In">{bookingData.checkin} </Descriptions.Item>
                    <Descriptions.Item label="Chek-Out">{bookingData.checkout} </Descriptions.Item>
                    <Descriptions.Item label="Main Pax">{pax.first_name} {pax.last_name} </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <br />
            <Row>
                <Col span={24}>
                    <Card title="Payment Information">
                        <Row>
                            <Col span={6}>Price Per Night</Col>
                            <Col span={6}>Nights</Col>
                            <Col span={6}>Late Checkout</Col>
                            <Col span={6}>Balance</Col>
                        </Row>
                        <Row>
                            <Col span={6}>{price}</Col>
                            <Col span={6}>{nights}</Col>
                            <Col span={6}><InputNumber min={0} value={lateCheckout} onChange={(v) => setLateCheckout(v)} /> </Col>
                            <Col span={6}>{price && (price * nights) + lateCheckout}</Col>
                        </Row>
                        <br />
                        <h3>Payments</h3>
                        <br />
                        <Row>
                            <Col span={6}>Payment ID</Col>
                            <Col span={6}>quantity</Col>
                            <Col span={6}>Status</Col>
                            <Col span={6}></Col>
                        </Row>
                        {
                            roomPayments.map((payment: any) => {
                                return (
                                    <Row key={payment.id}>
                                        <Col span={6}>{payment.id}</Col>
                                        <Col span={6}>{payment.totalPrice}</Col>
                                        <Col span={6}>{payment.payment_status}</Col>
                                        <Col span={6}></Col>
                                    </Row>
                                )
                            })
                        }
                        <br />
                        <Row>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>Total:</Col>
                            <Col span={6}><Text strong>{price && ((price * nights) + lateCheckout) - payments}</Text></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>Payment Method</Col>
                            <Col span={6}>
                                <Select defaultValue="Cash" style={{ width: 120 }} onChange={handleChange}>
                                    <Select.Option value="Cash">Cash</Select.Option>
                                    <Select.Option value="Card">Card</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}><Button type="primary" onClick={handleCheckout}>Check-Out</Button></Col>
                        </Row>


                    </Card>
                </Col>
            </Row>

        </div>
    )
}
