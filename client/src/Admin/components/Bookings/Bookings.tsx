import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataBooking, getBookingsId, getPayments, getPaxId } from '../../actions/bookingsActions'
import { Form, DatePicker,Input, InputNumber, Button, Select, Table, Cascader, Switch } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import {  getCategoriesForSelect, getRoomsAvailable,  searchOrCreatePax } from '../../actions/createBookAdmin';
import { getAllRooms } from '../../actions/roomsActions';
import moment from 'moment';
import {residences, prefixSelector} from '../../../components/booking/paxForm/PaxForm'
const { RangePicker } = DatePicker;

export let loading = false;

export const Bookings = () => {

    // const filterData = (data: any) => {
    //     return data.map((book: any) => {
    //         return { text: book.id, value: book.id }
    //     })
    // }
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

    const storeBooking= useSelector((state:any) => state?.bookingsAdminR)
    
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
                        if(actualBooking?.paxTitular_id === pax_id) {
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
            title: 'Status',
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

    ]

    const [loading, setLoading] = useState(true)
    const [loadingSelect, setLoadingSelect] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [guestsQ, setGuestsQ] = useState(0)
    const [dateMSJ, setDateMSJ] = useState('')
    const [disable, setDisable] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    // const [r, setGuestsQ] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataBooking('all')) //BOOKING_PAX
        dispatch(getBookingsId()) //BOOKINGS    
        dispatch(getPayments()) //PAYMENTS
        dispatch(getPaxId()) //PAXES
        // dispatch(getCategoriesForSelect())
    }, [dispatch])
    
    useEffect(()=> {
        if(storeBooking?.bookingPax?.length > 0 && storeBooking?.bookings?.length> 0 && storeBooking?.paxes?.length > 0 && storeBooking?.payments?.length > 0) {
            setLoading(false)
        }
    }, [storeBooking.bookingPax, storeBooking.bookings, storeBooking.paxes, storeBooking.payments ])

    const onSelectAll = () => {
        dispatch(getDataBooking('all'))
    }

    const onSelectNext = () => {
        dispatch(getDataBooking('next'))
    }
    const onSelectPrev = () => {
        dispatch(getDataBooking('prev'))
    }
            
    const onFinish = (fieldsValue:any) => {
        const rangeValue = fieldsValue['range-picker'];
        const values = {
            ...fieldsValue,
            'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        console.log('Received values of form: ', values);

        // dispatch(searchOrCreatePax(values))
    }
    
    const closeModal = () => {
        setIsModalVisible(false)
    }

    const onChangeSelect = (value:any) => {
        console.log(value)
        dispatch(getAllRooms())
    }

    const onChangeGuests = (value:number) => {
        setGuestsQ(value)
        setLoadingSelect(true)
        dispatch(getCategoriesForSelect())
    }

    const onChangeRange = (fieldsValue:any) => {
        // console.log(value['range-picker'])
        const today = moment().format('YYYY-MM-DD')
        setLoadingSelect(true)
        setDisable(true)
        if(fieldsValue[0].format('YYYY-MM-DD') < today) {
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
            setLoadingSelect(false)
        }
    }

    // const onChangeUUID = (e:any) => {
    //     dispatch(searchOrCreatePax(e))
    // }

    const onFinishUUID = (e:any) => {
        
        console.log(e)
        dispatch(searchOrCreatePax(e))
        setOpenForm(true)
        console.log(storeBooking)
    }

    // const handleClickNext = (e:any) => {
    //     e.preventDefault();
        
    //     dispatch(roomSelectedAD());
    //   }

    return (
        <>
        <div>
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
           />
        </div>
        
        <div>
        <Modal title="Create Booking" visible={isModalVisible} onCancel={closeModal} footer={null} >
            <div>
            {/* UUID */}
            <Form  >
            <Form.Item name="uuid" label="ID/DNI/Passport" rules={[{required: true,message:'Please input a pax identification!', whitespace: true}]}>
                {/* <Input onChange= {e => onChangeUUID(e)} /> */}
                <Input.Search onSearch={onFinishUUID} enterButton />
            </Form.Item>
            {/* <Button type="primary" htmlType="submit" >Search Pax</Button> */}
            </Form>
            </div>
            { openForm?<Form name="time_related_controls" {...formItemLayout} onFinish={onFinish} >
                { storeBooking?.paxInfo.length > 0? storeBooking?.paxInfo.map((p:any, i:number) => (
                        <><p key={i}>Pax: {p.first_name} {p.last_name} | {p.country}</p></>
                    )):<Form
                    {...formItemLayout}
                    name="register"
                    // onFinish={onFinish}
                    initialValues={{country: ['United States'], prefix: '1', remember: true }}
                    scrollToFirstError
                    className='form'
                >
                    <Form.Item name="first_name" label="Name" rules={[{ required: true, message: 'Please input your name!',
                    whitespace: true}]}>
                        <Input className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="birth_date"
                        label="Birth Date"
                        rules={[
                            {
                                // type: 'string',
                                required: true,
                                message: 'Please select your birth date!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label="Country"
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: 'Please select your country!',
                            },
                        ]}
                    >
                        <Cascader options={residences} className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                            className='paxForm_input'
                        />
                    </Form.Item>


                    <Form.Item
                        name='titular'
                        label='Titular'
                    >
                        <Switch
                            defaultChecked={true}
                            checked={true}
                        /> 
                        <div>Esto no va</div>
                    </Form.Item>


                    {/* <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            CONFIRM BOOKING
                </Button> 
                     </Form.Item> */}

                </Form>
                }
                {/* Guests */}
                <Form.Item  
                label="Guests" 
                name="guests"  
                rules = {[{required: true, message: 'Please select guests!'}]} 
                >
                    <InputNumber name="guests" min={1} max={6} onChange = {e => onChangeGuests(e)}/>
                </Form.Item>

                {/* CheckIn CheckOut */}
                <Form.Item name="range-picker" label="CheckIn - CheckOut" rules = {[{type: 'array', required: true, message: 'Please select category!'}] } >
                    <RangePicker onChange={e => onChangeRange(e)} />
                </Form.Item>

                {/* Category */}
                { dateMSJ.length > 0 ? <div>{dateMSJ}</div>:<div></div>}

                <Form.Item label="Category" name='category' rules = {[{required: true, message: 'Please select category!'}]}>

                    <Select onChange={e => onChangeSelect(e)} loading={loadingSelect} disabled = {disable}>
                        { storeBooking?.categories?.map((cat: any, i: number) =>
                             (<Select.Option value={cat.name} key={i}>{cat.name}</Select.Option>))}
                    </Select>
                    </Form.Item>
                

                    {/* Type */}
                <Form.Item label="Type"  name='type' rules = {[{required: true, message: 'Please select type!'}]}>
                <Select loading={loadingSelect} disabled = {disable}>
                        {
                            storeBooking?.types?.map( (t: any, i: number) => {
                                return (
                                    <Select.Option value={t.name} key={i}>{t.name}</Select.Option>
                                )
                            })
                        }
                    </Select>
                    </Form.Item>

                   

                    <div className="adminrooms_btn">
                        <Button onClick={closeModal}>Cancel</Button>
                    <Form.Item
                        wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Next</Button>
                    </Form.Item>
                    </div>
                    </Form>: <div></div>}
        
        </Modal>
        </div>
        </>
    )
}