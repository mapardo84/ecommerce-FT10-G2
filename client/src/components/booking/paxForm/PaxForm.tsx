import React, { useEffect, useState } from 'react';
//import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, DatePicker, Checkbox, Button, Switch } from 'antd';
import { sendPax } from '../../../actions/Booking/PaxFormActions';
import '../paxForm/PaxForm.less'
import { getPax, stepChange } from '../../../actions/Booking/bookingAction';
import { useDispatch, useSelector } from 'react-redux';
import { MercadoPago } from '../../MercadoPago/MercagoPago';
import { supabase } from '../../../SupaBase/conection'
import Modal from 'antd/lib/modal/Modal';
import { Pre_booking } from '../../Pre_booking/Pre_booking';
const { Option } = Select;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
    },
    {
        value: 'argentina',
        label: 'Argentina',
    },
    {
        value: 'unitedStates',
        label: 'United States',
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
    }
];

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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export interface PaxValues {
    first_name: string,
    last_name: string,
    uuid: string,
    birth_date: Date,
    address: string,
    phone: string,
    country: string
}



export function PaxForm() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const pax_data = useSelector((state: any) => state.bookings.pax_data); //pax_data


    const [uuid_match, setUuid_match] = useState(false)     //searchbar pax

    const [setInfo, setSetInfo] = useState(false)


    const bookings = useSelector((state: any) => state?.bookings)
    const { booking } = bookings
    const [mp, setMp] = useState<any>(false)

    useEffect(() => {
        if (pax_data) {

        }

    }, [pax_data])





    const handleClickBack = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("Accomodation")
        setMp(false)
        setSetInfo(false)
        dispatch(stepChange(1));
    }
    const onFinish = (values: PaxValues) => {
        console.log('Received values of form: ', values);
        sendPax(values)
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
                <Option value="54">+54</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    const onChange = async (value: any, allvalues: any) => {

        console.log(booking)
        for (let i in allvalues) {
            if (!allvalues[i]) {
                return setMp(false)
            } else {
                continue
            }
        }
        const { uuid, first_name, last_name, phone, country, address, birth_date } = allvalues


        let bookingInfo = {
            checkin: booking.range[0],
            checkout: booking.range[1],
            category: booking.category[0].category.name,
            type: booking.category[0].type.name,
            nights: booking.nights,
            unit_price: booking.fee,
            room_id: booking.room_id,
            uuid,
            first_name,
            last_name,
            paxes: booking.guests,
            phone,
            country,
            birth_date,
            address,
        }
        await localStorage.setItem("BookingInfo", JSON.stringify(bookingInfo))
        if (supabase.auth.user()) {
            setMp(true)
        }
    }

    const [visible, setvisible] = useState(false)

    return (
        <div className='paxForm_containerPayment'>


            <div className="backButtonPayment">
                <Button size="large" onClick={handleClickBack} type="primary" >
                    BACK
            </Button>
            </div>

            <div className="leftContainerPayment">
                <div>
                    <Pre_booking type={1} />
                </div>

                <div className="formBookingSearch">
                    <div>
                        <h1 className="Login">IDENTIFICATION</h1>
                        <div className="searchPaymentText">If you have an account, please enter your identification.</div>
                        <Form>
                            <Form.Item>
                                <Input.Search
                                    placeholder="Identification"
                                    width="120px"
                                    onSearch={(value, event) => {
                                        setSetInfo(true)
                                        setMp(false)
                                        dispatch(getPax(value))
                                        setvisible(true)
                                    }}>
                                </Input.Search>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </div>

            <div>
                {pax_data && setInfo &&
                    <Modal
                        visible={visible}
                        width={450}
                        destroyOnClose={true}
                        onCancel={() => {
                            setvisible(false)
                        }}
                    >
                        <ul>
                            <div>First name : {pax_data.first_name}</div>
                            <div>Last name : {pax_data.last_name}</div>
                            <div>Uuid : {pax_data.uuid}</div>
                            <div>Country : {pax_data.country}</div>
                        </ul>
                        <Button onClick={() => setMp(true)}>Confirm</Button>
                        {mp ? <MercadoPago /> : null}
                    </Modal>
                }

                {!pax_data && setInfo &&

                    <Modal
                        visible={visible}
                        width={450}
                        destroyOnClose={true}
                        onCancel={() => {
                            setvisible(false)
                        }}
                    >

                        <ul>
                            no existís
                        </ul>
                    </Modal>
                }
            </div>



            <div className='formBookingPayment'>
                <h1 className="Login">GUEST INFORMATION</h1>
                <div className="searchPaymentText">If you don't have an account, please fill this form</div>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onValuesChange={onChange}
                    onFinish={onFinish}
                    initialValues={{
                        country: ['United States'],
                        prefix: '1',
                        remember: true
                    }}
                    scrollToFirstError
                    className='form'
                >


                    <Form.Item
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Name" className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Last Name" className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="birth_date"
                        rules={[
                            {
                                // type: 'string',
                                required: true,
                                message: 'Please select your birth date!',
                            },
                        ]}
                    >
                        <DatePicker className="datePickerBirthday" placeholder="Bithday" />
                    </Form.Item>

                    <Form.Item
                        name="uuid"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your identification!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Identification" className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="country"
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: 'Please select your country!',
                            },
                        ]}
                    >
                        <Cascader placeholder="Country" options={residences} className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="Address" className='paxForm_input' />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Phone Number"
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                            className='paxForm_input'
                        />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="https://memegenerator.net/img/instances/64451727/i-believe-we-have-an-agreement.jpg">agreement</a>  {/* hacer modal con foto*/}
                        </Checkbox>
                    </Form.Item>
                    {mp ? <MercadoPago /> : null}


                </Form>
            </div>

        </div>
    );
};