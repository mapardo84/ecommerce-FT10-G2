import { Button, Descriptions, PageHeader, Tag, Row, Col, Card, DatePicker, Modal, AutoComplete, Input, List, Typography, Tooltip } from 'antd';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Room } from './Checkin';
import { IType } from '../Types/Types';
import { Category } from '../Categories/Categories';
import { nextBookingRoom, checkout, updatePaxRoom, createBookingAndUpdateRoom } from '../../actions/checkinActions';
import moment from 'moment';
import { getByPaxUuid } from '../../actions/searchBarActions'
import { CheckinAddPaxes } from './CheckinAddPaxes';
import { CheckinSearchingPaxes } from './CheckinSearchingPaxes';

interface IPax {
    id: number,
    firstName: string,
    lastName: string
}

export const CheckinAvailable = ({ steps }: { steps: Function }): JSX.Element => {

    const [roomSelected, setRoomSelected] = useState<Room>()
    const [roomCategory, setRoomCategory] = useState<Category>()
    const [roomType, setRoomType] = useState<IType>()
    const [price, setPrice] = useState<number>()
    const [mainPax, setMainPax] = useState(0)
    const [mainPaxName, setMainPaxName] = useState('')
    const [paxes, setPaxes] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [errors, setErrors] = useState<string | null>(null)
    const [checkoutDate, setCheckoutDate] = useState<string>('')
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false);
    const [search, setSearch] = useState("")
    const [created, setCreated] = useState('')
    const [modalForPaxes, setModalForPaxes] = useState(false)
    const [dateSelected, setDateSelected] = useState<string>()
    const [booking, setBooking] = useState<string | null>(null)

    const dispatch = useDispatch()


    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { categories } = useSelector((state: any) => state?.categories)
    const { types } = useSelector((state: any) => state?.types)
    const { roomId, nextBooking, nextBookingData } = useSelector((state: any) => state?.checkin)
    const bookingStore = useSelector((state: any) => state.booking_pax)

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

    useEffect(() => {
        dispatch(getByPaxUuid(search))
    }, [dispatch, search])

    const onDatePick = (date: any, dateString: string) => {
        //console.log(date, dateString)
        const days = date.diff(moment(), 'days')
        setCheckoutDate(dateString)
        setDateSelected(date)
        setTotalPrice(price ? price * (days + 1) : 0)
    }

    const disabledDate = (current: moment.Moment) => {
        return current && (current < moment().endOf('day') || current > moment(nextBooking));
    }

    const handleCheckin = () => {
        setErrors(null)
        if (mainPax === 0) {
            setErrors('Should select a main pax')
            return
        }
        if (checkoutDate === '') {
            setErrors('Should select checkout date')
            return
        }
        //room asignada...
        // console.log("Id de la habiacion: ", roomSelected?.id)
        // console.log("Pasajero: ", mainPax)
        // console.log("Current booking", booking)
        // console.log("checkout", checkoutDate)
        console.log("paxes:", paxes)

        //si existe booking no se crea... solo se modifica el room (availability, current pax y booking )
        if (booking && roomSelected) {
            updatePaxRoom({ room_id: roomSelected.id, curent_pax: mainPax, curent_booking: booking, paxes: paxes })
            steps(0)
        } else {
            //si no existe booking toca crearlo.
            if (roomSelected) {
                createBookingAndUpdateRoom({ room_id: roomSelected.id, curent_pax: mainPax, checkout: checkoutDate, paxes: paxes })
                steps(0)
            }
        }
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }
    const closeCreateModal = () => {
        setModalCreateVisible(false)
    }
    const closeModalForPaxes = () => {
        setModalForPaxes(false)
    }
    const onChange = (value: string) => {
        setSearch(value)
    }

    const renderTitle = (title: string) => (
        <span key={title}>
            {title}
        </span>
    );

    let i = 0;

    const renderItem = (title: string | number) => {
        i++
        return ({
            value: `${i}.${title}`,
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {title}
                </div>
            ),
        });
    }

    const mapeoByUuid = (array: any[]) => {
        return array ? array.map((x) => renderItem(x?.uuid)) : []
    }

    const options = [
        {
            label: renderTitle('By UUID'),
            options: mapeoByUuid(bookingStore?.byLastUuid)
        },
    ];

    const onSelect = (value: string) => {
        //console.log('onSelect', value);
        let selected = value.split('.')
        setSearch(selected[1])
        //console.log('onSelect', search);
        setMainPax(bookingStore?.byLastUuid[0]?.id)
        setMainPaxName(bookingStore?.byLastUuid[0]?.first_name)
        closeModal()
    };

    const handleCreate = () => {
        closeModal()
        setModalCreateVisible(true)
    }

    const handleRemove = (item: number) => {
        //console.log("Remove: ", item)
        setPaxes((e) => e.filter((pax: IPax) => pax.id !== item))
    }
    const handleRemoveMain = () => {
        setMainPax(0)
    }

    const loadBookingData = () => {
        //setting booking data
        setMainPax(nextBookingData.paxTitular_id.id)
        setMainPaxName(nextBookingData.paxTitular_id.first_name)
        setDateSelected(nextBookingData.checkout)
        setCheckoutDate(nextBookingData.checkout)
        const days = moment(nextBookingData.checkout).diff(moment(), 'days')
        setTotalPrice(price ? price * (days + 1) : 0)
        setBooking(nextBookingData.id)

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
                    <span key="1">State: {
                        roomSelected?.availability === 'available' &&
                        <Tag color='green' key='available' >
                            Available
                        </Tag>
                    }
                    </span>
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Price">{price}</Descriptions.Item>
                    <Descriptions.Item label="Type"> {roomType?.name}</Descriptions.Item>
                    <Descriptions.Item label="Category">{roomCategory?.name}</Descriptions.Item>
                    <Descriptions.Item label="Next Booking">
                        <Tooltip title="Load booking data">
                            {
                                nextBookingData ?
                                    <span className="checkin_charge" onClick={loadBookingData}>
                                        {nextBooking}
                                    </span> :
                                    nextBooking
                            }
                        </Tooltip>
                    </Descriptions.Item>
                    <Descriptions.Item label="Details">{roomCategory?.description}</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <br />
            <Row>
                <Col span={12}>
                    <Card title="Pax Information">
                        <Card type="inner" title="Main pax" extra={<span onClick={() => setIsModalVisible(true)} className='checkin_search'>Search/Add</span>} >
                            {
                                mainPax ? <Tag
                                    closable
                                    onClose={handleRemoveMain}
                                >
                                    {mainPaxName}
                                </Tag> : 'Not selected'
                            }
                        </Card>
                        <Card
                            style={{ marginTop: 16, minHeight: '300px' }}
                            type="inner"
                            title="Extra Paxes"
                            extra={<span onClick={() => setModalForPaxes(true)} className='checkin_search'>Search/Add</span>}
                        >
                            {
                                paxes.map((item: IPax, key: number) => {
                                    return (
                                        <span key={key} >
                                            <span className="checkin_tag" onClick={() => handleRemove(item.id)}>
                                                {/* <Tag
                                                closable
                                                onClose={() => handleRemove(item.id)}
                                            > */}
                                                {item.firstName} {item.lastName}
                                                {/* </Tag> */} <span className="checkin_x">X</span>
                                            </span ><br /></span>
                                    )
                                })
                            }
                        </Card>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Booking Information">
                        Checkout:
                        {
                            dateSelected ?
                                <DatePicker
                                    onChange={onDatePick}
                                    value={moment(dateSelected)}
                                />
                                :
                                <DatePicker
                                    disabledDate={disabledDate}
                                    onChange={onDatePick}
                                />
                        }
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
            <Modal title='Add Pax' visible={isModalVisible} onCancel={closeModal} footer={null}>
                {
                    created && created
                }
                <br />
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{
                        width: 300,
                    }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={onChange}
                    value={search}
                >
                    <Input.Search size="large" placeholder="Search Pax" onSearch={onSelect} />
                </AutoComplete>
                <br />
                <br />
                <Button type="primary" onClick={handleCreate}>Create</Button>
            </Modal>
            <Modal title='Create Pax' visible={modalCreateVisible} onCancel={closeCreateModal} footer={null}>
                <CheckinAddPaxes setModal={setModalCreateVisible} setPax={setMainPax} setPaxName={setMainPaxName} firstModal={setIsModalVisible} created={setCreated} />
            </Modal>
            <Modal title='Create Pax' visible={modalForPaxes} onCancel={closeModalForPaxes} footer={null}>
                <CheckinSearchingPaxes setModal={setModalForPaxes} bookingStore={bookingStore} setModalCreateVisible={setModalCreateVisible} setPaxes={setPaxes} created={created} />
            </Modal>
        </div >
    )
}
