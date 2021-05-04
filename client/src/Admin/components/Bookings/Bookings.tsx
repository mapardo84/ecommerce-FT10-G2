import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataBooking, getBookingsId, getPayments, getPaxId } from '../../actions/bookingsActions'
import { Form, DatePicker, Input, InputNumber, Button, Select, Table, Cascader, Switch, Tooltip, Popconfirm, Modal } from 'antd';
import { finalCreateBooking, getRoomsAvailable, inactiveBooking, searchOrCreatePax } from '../../actions/createBookAdmin';
import { getAllRooms } from '../../actions/roomsActions';
import moment from 'moment';
import { residences } from '../../../components/booking/paxForm/PaxForm'
import { roomType } from '../../../components/booking/accomodationsSelect/AccomodationsSelect';
import { AiFillCloseCircle } from "react-icons/ai"
import { SearchBooking } from '../SearchBar/SearchBar'

const { RangePicker } = DatePicker;
export let loading = false;

export const Bookings = () => {
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const storeBooking = useSelector((state: any) => state?.bookingsAdminR)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'booking_id',
            key: 'booking_id',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.id}</>),
            // filters: filterData(storeBooking.bookings),
            // onFilter: (value: any, books: any) => {
            //     return books.booking_id === value
            // }
        },
        {
            title: 'First Name',
            dataIndex: 'pax_id',
            key: 'firstname',
            render: (pax_id: number) => (<>{storeBooking?.paxes?.find((pax: any) => pax.id === pax_id)?.first_name}</>),
            // sorter: (a: any, b: any) => a.name - b.name,
        },
        {
            title: 'Last Name',
            dataIndex: 'pax_id',
            key: 'lastname',
            render: (pax_id: number) => (<>{storeBooking?.paxes?.find((pax: any) => pax.id === pax_id)?.last_name}</>)
        },
        {
            title: 'UUID',
            dataIndex: 'pax_id',
            key: 'uuid',
            render: (pax_id: number) => (<>{storeBooking?.paxes?.find((pax: any) => pax.id === pax_id)?.uuid}</>)
        },
        {
            title: 'Titular',
            dataIndex: 'pax_id',
            key: 'titular',
            render: (pax_id: number, booking_id: any) => {
                let actualBooking = storeBooking?.bookings?.find((book: any) => book.id === booking_id?.booking_id)
                if (actualBooking?.paxTitular_id === pax_id) {
                    return (<div>Yes</div>)
                } else {
                    return (<div>No</div>)
                }
            }
        },
        {
            title: 'Check In',
            dataIndex: 'booking_id',
            key: 'checkin',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.checkin}</>)
        },
        {
            title: 'Check Out',
            dataIndex: 'booking_id',
            key: 'checkout',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.checkout}</>)
        },
        {
            title: 'Paxes',
            dataIndex: 'booking_id',
            key: 'paxes',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.paxes_amount}</>)
        },
        {
            title: 'Room',
            dataIndex: 'booking_id',
            key: 'roomname',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.rooms?.name}</>),
            // filters: filterData(storeBooking?.bookings),
            // onFilter: (value: any, books: any) => {
            //     return books.booking_id === value
            // }
        },
        {
            title: 'Category',
            dataIndex: 'booking_id',
            key: 'categoryname',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.rooms?.category_id?.name}</>)
        },
        {
            title: 'Type',
            dataIndex: 'booking_id',
            key: 'typename',
            render: (booking_id: number) => (<>{storeBooking?.bookings?.find((book: any) => book.id === booking_id)?.rooms?.type_id?.name}</>)
        },
        {
            title: 'Payment Status',
            dataIndex: 'booking_id',
            key: 'payment_status',
            render: (booking_id: number) => (<>{storeBooking?.payments?.find((book: any) => book.booking_id === booking_id)?.payment_status}</>)
        },
        {
            title: 'Total Price',
            dataIndex: 'booking_id',
            key: 'totalPrice',
            render: (booking_id: number) => (<>{storeBooking?.payments?.find((book: any) => book.booking_id === booking_id)?.totalPrice}</>)
        },
        {
            title: 'Early Checkin',
            dataIndex: 'booking_id',
            key: 'early_check',
            render: (booking_id: number) => {
                let actualBooking = storeBooking?.bookings?.find((book: any) => book.id === booking_id)

                if (actualBooking?.early_check === true) {
                    return (<div>Yes</div>)
                } else {
                    return (<div>No</div>)
                }
            }
        },
        {
            title: 'Late Checkout',
            dataIndex: 'booking_id',
            key: 'late_check',
            render: (booking_id: number) => {
                let actualBooking = storeBooking?.bookings?.find((book: any) => book.id === booking_id)

                if (actualBooking?.late_check === true) {
                    return (<div>Yes</div>)
                } else {
                    return (<div>No</div>)
                }
            }
        },
        {
            title: 'Active',
            dataIndex: 'booking_id',
            key: 'active',
            render: (booking_id: number) => {
                let actualBooking = storeBooking?.bookings?.find((book: any) => book.id === booking_id)

                if (actualBooking?.status === true) {
                    return (<div>Yes</div>)
                } else {
                    return (<div>No</div>)
                }
            }
        },
        {
            title: "",
            dataIndex: "operation",
            key: "cancel",
            render: (_: undefined, record: { booking_id: number }) =>
                storeBooking?.bookings.length >= 1 ? (
                    <>
                        <Tooltip title="Cancel">
                            <Popconfirm
                                placement="left"
                                title="Sure to cancel?"
                                onConfirm={() => handleActive(record.booking_id)}
                            >
                                <span>
                                    {" "}
                                    <AiFillCloseCircle size="18" color="red" />
                                </span>
                            </Popconfirm>
                        </Tooltip>
                    </>
                ) : null,
        },
    ]

    const [loading, setLoading] = useState<boolean>(true)

    const [loadingSelect, setLoadingSelect] = useState<boolean>(true)
    const [loadingRange, setLoadingRange] = useState<boolean>(true)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [formPayment, setFormPayment] = useState<boolean>(false)
    const [guestsQ, setGuestsQ] = useState<number>(0)
    const [dateMSJ, setDateMSJ] = useState<string>('')
    const [disable, setDisable] = useState<boolean>(false)
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [noRoomMSG, setNoRoomMSG] = useState<boolean>(false)
    const [bookingState, setBookingState] = useState({
        address: "",
        birth_date: {},
        category: 0,
        country: [],
        early_check: false,
        first_name: '',
        guests: 0,
        last_name: "",
        late_check: false,
        phone: "132416123",
        'range-picker': [],
        type: 0,
        uuid: "",
    })
    // const [r, setGuestsQ] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataBooking('all', false, false)) //BOOKING_PAX
        dispatch(getBookingsId()) //BOOKINGS    
        dispatch(getPayments()) //PAYMENTS
        dispatch(getPaxId()) //PAXES
        // dispatch(getCategoriesForSelect())
    }, [dispatch])

    useEffect(() => {
        if (storeBooking?.bookingPax?.length > 0 && storeBooking?.bookings?.length > 0 && storeBooking?.paxes?.length > 0 && storeBooking?.payments?.length > 0) {
            setLoading(false)
        }
    }, [storeBooking.bookingPax, storeBooking.bookings, storeBooking.paxes, storeBooking.payments])

    const onSelectAll = () => {
        dispatch(getDataBooking('all', false, false))
    }

    const onSelectNext = () => {
        dispatch(getDataBooking('next', false, false))
    }
    const onSelectPrev = () => {
        dispatch(getDataBooking('prev', false, false))

    }

    const handleActive = (id: number) => {
        console.log(id)
        dispatch(inactiveBooking(id));
    }

    const onFinishFirstForm = (fieldsValue: any) => {
        setOpenForm(false)
        setFormPayment(true)
        console.log(fieldsValue.birth_date)


        if (fieldsValue.early_check === 'undefined') {
            fieldsValue.early_check = false
        }
        if (fieldsValue.late_check === 'undefined') {
            fieldsValue.late_check = false
        }

        console.log(fieldsValue)
        const rangeValue = fieldsValue['range-picker'];
        const values = {
            ...fieldsValue,
            birth_date: fieldsValue?.birth_date?.format('YYYY-MM-DD'),
            'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        console.log('Received values of form: ', values);
        if (storeBooking?.paxInfo) {
            setBookingState({ ...values, id: storeBooking?.paxInfo[0]?.id })
        } else {
            setBookingState(values)
        }
        // dispatch(searchOrCreatePax(values))
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setOpenForm(false)
        setFormPayment(false)
        dispatch(searchOrCreatePax(null))
    }

    const closeFinish = () => {
        setIsModalVisible(false)
        setOpenForm(false)
        setFormPayment(false)
        dispatch(searchOrCreatePax(null))

        let secondsToGo = 5;
        const modal = Modal.success({
            title: 'Your booking has been successful!',
            content: `This will be closed after ${secondsToGo} second.`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `This will be closed after ${secondsToGo} second.`,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);


        // dispatch(getDataBooking('all')) //BOOKING_PAX
        // dispatch(getBookingsId()) //BOOKINGS    
        // dispatch(getPayments()) //PAYMENTS
        // dispatch(getPaxId()) //PAXES
    }

    const onChangeSelect = (value: any) => {
        console.log(value)
        dispatch(getAllRooms())
    }

    const onChangeGuests = (value: number) => {
        setGuestsQ(value)
        setLoadingSelect(true)
        setLoadingRange(false)
        // dispatch(getCategoriesForSelect())
    }

    const onChangeRange = (fieldsValue: any) => {
        // console.log(value['range-picker'])
        const today = moment().format('YYYY-MM-DD')
        setTimeout(() => setLoadingSelect(true), 500)
        setDisable(true)
        if (fieldsValue[0].format('YYYY-MM-DD') < today) {
            const msg = 'You have to choose a future date'
            setDisable(true)
            setDateMSJ(msg)
        } else {
            setDisable(false)
            setDateMSJ('')
            const rangeValue = fieldsValue;
            const values = {
                'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
            };
            // dispatch(fastFilterCategories(guestsQ))
            dispatch(getRoomsAvailable(guestsQ, values['range-picker']))
            setTimeout(() => setLoadingSelect(false), 1000)
        }
    }

    const onFinishUUID = (e: any) => {
        console.log(e)

        dispatch(searchOrCreatePax(e))
        setFormPayment(false)
        // setOpenForm(true)
        setTimeout(() => setOpenForm(true), 1000)
        // dispatch(getPaxId(null))
        console.log(storeBooking)
    }

    const finalForm = (e: any) => {

        console.log('free rooms', storeBooking?.freeRooms)
        const roomSelected = storeBooking?.freeRooms.find((r: roomType) => {
            console.log(bookingState?.category, bookingState?.type)
            return (r.category_id === bookingState?.category && r.type_id === bookingState?.type)
        });

        console.log(bookingState, e, roomSelected)
        if (roomSelected) {
            dispatch(finalCreateBooking(bookingState, e, roomSelected.id))
        } else {
            setNoRoomMSG(true)
        }
    }

    return (
        <>
            <div>
                <SearchBooking />
                <Button onClick={onSelectPrev}>Previus Reservations</Button>
                <Button onClick={onSelectAll}>All</Button>
                <Button onClick={onSelectNext}>Pending Reservations</Button>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>Create Booking</Button>
            </div>

            <div>
                <Table
                    columns={columns}
                    dataSource={storeBooking?.bookingPax}
                    loading={loading}
                    rowKey='id'
                />
            </div>

            <div>
                <Modal zIndex={5} title="Create Booking" visible={isModalVisible} onCancel={closeModal} footer={null} destroyOnClose={true} >
                    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinishFirstForm} initialValues={{ country: ['United States'], prefix: '1', remember: true }} scrollToFirstError >


                        {/* UUID */}
                        <div>
                            <Form.Item name="uuid" label="ID/DNI/Passport" rules={[{ required: true, message: 'Please input a pax identification!', whitespace: true }]} >
                                <Input.Search onSearch={onFinishUUID} enterButton onKeyDown={(e) => e.keyCode === 13 ? e.preventDefault() : ''} />
                            </Form.Item>
                        </div>


                        {/* FORM DATA PAX && DATA BOOKING*/}
                        {openForm ? <div>
                            {/* DATA PAX EXISTENTE */}
                            {storeBooking?.paxInfo.length > 0 ? storeBooking?.paxInfo.map((p: { id: number | string, first_name: string, last_name: string, country: string }, i: number) => (
                                <div key={`pI${i}`} >
                                    <h3>{p.first_name} {p.last_name}</h3>
                                    <h3>{p.country}</h3>
                                </div>
                            )) : <div>


                                {/* FIRST NAME  */}
                                <Form.Item name="first_name" label="Name" rules={[{
                                    required: true, message: 'Please input your name!',
                                    whitespace: true
                                }]}>
                                    <Input />
                                </Form.Item>

                                {/* LAST NAME  */}
                                <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}>
                                    <Input />
                                </Form.Item>

                                {/* BIRTH DATE  */}
                                <Form.Item name="birth_date" label="Birth Date" rules={[{ required: true, message: 'Please select your birth date!' }]}>
                                    <DatePicker />
                                </Form.Item>

                                {/* COUNTRY  */}
                                <Form.Item name="country" label="Country" rules={[{ type: 'array', required: true, message: 'Please select your country!' }]}>
                                    <Cascader options={residences} />
                                </Form.Item>

                                {/* ADDRESS  */}
                                <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!', whitespace: true }]}>
                                    <Input />
                                </Form.Item>

                                {/* PHONE  */}
                                <Form.Item name="phone" label="Phone Number" rules={[{ type: "string", required: true, message: 'Please input your phone number!' }]}>
                                    <Input style={{ width: '100%' }} />
                                </Form.Item>

                            </div>
                            }

                            {/* Guests */}
                            <Form.Item
                                label="Guests"
                                name="guests"
                                rules={[{ required: true, message: 'Please select guests!' }]}
                            >
                                <InputNumber name="guests" min={1} max={6} onChange={e => onChangeGuests(e)} />
                            </Form.Item>

                            {/* CheckIn CheckOut */}
                            <Form.Item name="range-picker" label="CheckIn - CheckOut" rules={[{ type: 'array', required: true, message: 'Please select category!' }]} >
                                <div className="containerRp">
                                    <RangePicker onChange={e => onChangeRange(e)} disabled={loadingRange} />
                                </div>
                            </Form.Item>

                            {dateMSJ.length > 0 ? <div style={{ color: 'red' }}>{dateMSJ}</div> : <div></div>}
                            {noRoomMSG ? <div style={{ color: 'red' }}>There are no rooms available for this date!</div> : <div></div>}

                            {/* Category */}

                            <Form.Item label="Category" name='category' rules={[{ required: true, message: 'Please select category!' }]}>

                                <Select onChange={e => onChangeSelect(e)} loading={loadingSelect} disabled={disable}>
                                    {storeBooking?.categories?.map((cat: { id: string | number, name: string }, i: number) => {
                                        return (<Select.Option value={cat.id} key={`c${i}`}>{cat.name}</Select.Option>)
                                    })
                                    }



                                </Select>
                            </Form.Item>


                            {/* Type */}
                            <Form.Item label="Type" name='type' rules={[{ required: true, message: 'Please select type!' }]}>
                                <Select loading={loadingSelect} disabled={disable}>
                                    {storeBooking?.types?.map((t: { id: string | number, name: string }, i: number) => {
                                        return (<Select.Option value={t.id} key={`t${i}`}>{t.name}</Select.Option>)
                                    })}
                                </Select>
                            </Form.Item>

                            {/* EARLY CHECKIN */}
                            <Form.Item name='early_check' label='Early Checkin' >
                                <Switch defaultChecked={false} />
                            </Form.Item>

                            {/* LATE CHECKOUT */}
                            <Form.Item name='late_check' label='Late Checkout' >
                                <Switch defaultChecked={false} />
                            </Form.Item>

                            <div className="adminrooms_btn">
                                {/* BOTON CANCEL */}
                                <Button onClick={closeModal} >Cancel</Button>

                                {/* BOTON NEXT  */}
                                <Form.Item wrapperCol={{ xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, } }}>
                                    <Button type="primary" htmlType="submit" >Next</Button>
                                </Form.Item>
                            </div>

                        </div> : <div></div>}

                    </Form>

                    {formPayment ? <Form onFinish={finalForm}>
                        {/* PAYMENT STATUS */}
                        <Form.Item label="Payment Status" name='payment_status' rules={[{ required: true, message: 'Please select payment status!' }]}>
                            <Select  >
                                (<Select.Option value='Approved' key='approved'>Approved</Select.Option>)
                        </Select>
                        </Form.Item>



                        {/* PAYMENT METHOD */}
                        <Form.Item label="Payment Method" name='payment_method' rules={[{ required: true, message: 'Please select payment method!' }]}>
                            <Select  >
                                (<Select.Option value='Card' key='Card'>Card</Select.Option>)
                                (<Select.Option value='Cash' key='Cash'>Cash</Select.Option>)
                        </Select>
                        </Form.Item>

                        {/* TOTAL PRICE */}
                        <Form.Item name="totalPrice" label="Total Price" rules={[{ type: "string", required: true, message: 'Please input the total price paid!' }]}>
                            <Input style={{ width: '100%' }} />
                        </Form.Item>

                        {/* BOTON CANCEL */}
                        <Button onClick={closeModal} >Cancel</Button>

                        {/* BOTON CONFIRM BOOKING */}
                        <Form.Item wrapperCol={{ xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, } }}>
                            <Button type="primary" htmlType="submit" onClick={closeFinish} disabled={openForm}>CONFIRM BOOKING</Button>
                        </Form.Item>
                    </Form> : <div></div>}
                </Modal>
            </div>
        </>
    )
}