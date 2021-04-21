import { Button, Descriptions, PageHeader, Tag, Row, Col, Card, DatePicker } from 'antd';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Room } from './Checkin';

import { IType } from '../Types/Types';
import { Category } from '../Categories/Categories';
import { nextBookingRoom } from '../../actions/checkinActions';
import moment from 'moment';

export const CheckinAvailable = ({ steps }: { steps: Function }): JSX.Element => {

    const [roomSelected, setRoomSelected] = useState<Room>()
    const [roomCategory, setRoomCategory] = useState<Category>()
    const [roomType, setRoomType] = useState<IType>()
    const [price, setPrice] = useState<number>()
    const [mainPax, setMainPax] = useState(0)
    const [paxes, setPaxes] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [errors, setErrors] = useState<string | null>(null)
    const [checkoutDate, setCheckoutDate] = useState(0)

    const dispatch = useDispatch()


    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { categories } = useSelector((state: any) => state?.categories)
    const { types } = useSelector((state: any) => state?.types)
    const { roomId, nextBooking } = useSelector((state: any) => state?.checkin)

    useEffect(() => {
        setRoomSelected(roomsList.find((room: Room) => room.id === roomId))
        dispatch(nextBookingRoom(roomId))
    }, [dispatch, roomId, roomsList])

    useEffect(() => {
        setRoomCategory(categories.find((category: Category) => category.id === roomSelected?.category_id))
        setRoomType(types.find((type: IType) => type.id === roomSelected?.type_id))

    }, [roomSelected, types, categories])

    useEffect(() => {
        if (roomCategory && roomType) {
            setPrice(roomCategory?.price * roomType?.beds)
        }
    }, [roomType, roomCategory])

    const onDatePick = (date: any, dateString: any) => {
        //console.log(date, dateString)
        const days = date.diff(moment(), 'days')
        setCheckoutDate(dateString)
        setTotalPrice(price ? price * (days + 1) : 0)
    }

    const disabledDate = (current: any) => {
        return current && (current < moment().endOf('day') || current > moment(nextBooking));
    }

    const handleCheckin = () => {
        setErrors(null)
        if (mainPax === 0) {
            setErrors('Should select a main pax')
            return
        }
        if (checkoutDate === 0) {
            setErrors('Should select checkout date')
            return
        }
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
                    <>State:{
                        roomSelected?.availability === 'available' &&
                        <Tag color='green' key='available' >
                            Available
                        </Tag>
                    }
                    </>
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Price">{price}</Descriptions.Item>
                    <Descriptions.Item label="Type">
                        {roomType?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">{roomCategory?.name}</Descriptions.Item>
                    <Descriptions.Item label="Next Booking">{nextBooking}</Descriptions.Item>
                    <Descriptions.Item label="Details">{roomCategory?.description}
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <br />
            <Row>
                <Col span={12}>
                    <Card title="Pax Information">
                        <Card type="inner" title="Main pax" extra={<span className='checkin_search'>Search/Add</span>}>
                            {
                                mainPax ? '' : 'Not selected'
                            }
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Extra Paxes"
                            extra={<span className='checkin_search'>Search/Add</span>}
                        >
                            {
                                paxes && 'Not selected'
                            }
                        </Card>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Booking Information">
                        Checkout:
                        <DatePicker
                            disabledDate={disabledDate}
                            onChange={onDatePick}
                        />
                        <br />
                        <br />
                        Total price: {totalPrice}
                        <br />
                        <br />
                        <Button type="primary" onClick={handleCheckin}>Check-In</Button>
                        <br />
                        <br />
                        <span className="checkin_errors">{errors}</span>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
