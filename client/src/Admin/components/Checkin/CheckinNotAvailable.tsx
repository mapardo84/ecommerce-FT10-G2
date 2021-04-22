import { PageHeader, Descriptions, Tag, Row, Card, Col, Button, Select, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextBookingRoom, getRoomBooking, getPaimentsOfBooking, checkout, createPayment } from '../../actions/checkinActions';
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
    const [payments, setPayments] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('Cash')
    const [earlyCheckin, setEarlyCheckin] = useState(true)
    const [lateCheckout, setLateCheckout] = useState(true)
    const [balance, setBalance] = useState(0)

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
    }, [dispatch, roomSelected, types, categories])

    useEffect(() => {
        //valor de la habitacion
        if (roomCategory?.price && roomType?.beds) {
            setPrice(roomCategory?.price * roomType?.beds)
        }
    }, [roomCategory, roomType])

    useEffect(() => {
        //valor total de payments realizados
        let total = 0
        roomPayments.forEach((payment: any) => {
            if (payment.payment_status === 'Approved') {
                total = total + payment.totalPrice
            }
        })
        setPayments(total)
        setBalance((e: number) => e - total)
    }, [roomPayments])

    useEffect(() => {
        //nights
        const nights = moment().diff(moment(bookingData.checkin), 'days')
        let sum = 0
        if (price) {
            sum = price * nights
        }
        //valor del late y early
        if (bookingData.early_check && price) {
            sum = sum + (price / 2)
        }
        if (bookingData.late_check && price) {
            sum = sum + (price / 2)
        }
        setBalance((e: number) => e + sum)

        //setear numero de noches y try o false en checks
        if (bookingData !== '') {
            setNights(nights)
            setEarlyCheckin(bookingData.early_check)
            setLateCheckout(bookingData.late_check)
        }
    }, [bookingData, price])

    const handleChange = (value: string) => {
        setPaymentMethod(value)
    }

    const handleCheckout = () => {
        //quitar el current_pax y el current_booking cambiar de not available a cleaning en Room
        if (roomSelected) {
            checkout(roomSelected?.id)
        }

        //crear un payment si debe dinero
        if (balance > 0) {
            createPayment({
                totalPrice: balance,
                booking_id: roomSelected?.curent_booking,
                payment_method: paymentMethod
            })
        }

        steps(0)

    }

    const onChangeEarly = (e: any) => {
        if (e.target.checked && price) {
            setBalance((e: number) => e + (price / 2))
        } else {
            price && setBalance((e: number) => e - (price / 2))
        }
        setEarlyCheckin((e: boolean) => !e)
    }
    const onChangeLate = (e: any) => {
        if (e.target.checked && price) {
            setBalance((e: number) => e + (price / 2))
        } else {
            price && setBalance((e: number) => e - (price / 2))
        }
        setLateCheckout((e: boolean) => !e)
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
                    <span key="3">State: {
                        roomSelected?.availability === 'not available' &&
                        <Tag color='red' key='available' >
                            Not Available
                        </Tag>
                    }
                    </span>
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
                            <Col span={6}></Col>
                            <Col span={6}>Balance</Col>
                        </Row>
                        <Row>
                            <Col span={6}>{price}</Col>
                            <Col span={6}>{nights}</Col>
                            <Col span={6}></Col>
                            <Col span={6}>{price && (price * nights)}</Col>
                        </Row>
                        <br />
                        <h3>Additional services</h3>
                        <br />
                        <Row>
                            <Col span={6}><Checkbox checked={earlyCheckin} onChange={onChangeEarly}></Checkbox>Early check-in</Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>{earlyCheckin && price && (price / 2)}</Col>
                        </Row>
                        <Row>
                            <Col span={6}><Checkbox checked={lateCheckout} onChange={onChangeLate}></Checkbox>Late Check-out</Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>{lateCheckout && price && (price / 2)}</Col>
                        </Row>
                        <br />
                        <h3>Payments</h3>
                        <br />
                        <Row>
                            <Col span={6}>Payment ID</Col>
                            <Col span={6}></Col>
                            <Col span={6}>Status</Col>
                            <Col span={6}></Col>
                        </Row>
                        {
                            roomPayments.map((payment: any) => {
                                return (
                                    <Row key={payment.id}>
                                        <Col span={6}>{payment.id}</Col>
                                        <Col span={6}></Col>
                                        <Col span={6}>{payment.payment_status}</Col>
                                        <Col span={6}>-{payment.totalPrice}</Col>
                                    </Row>
                                )
                            })
                        }
                        <br />
                        <Row>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>Total:</Col>
                            <Col span={6}><Text strong>{balance}</Text></Col>
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
