import React, { SyntheticEvent, useEffect, useState } from 'react';
//import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, DatePicker, Checkbox, Button } from 'antd';
import { sendPax } from '../../../actions/Booking/PaxFormActions';
import './PaxForm.less'
import { getPax, stepChange } from '../../../actions/Booking/bookingAction';
import { useDispatch, useSelector } from 'react-redux';
import { MercadoPago } from '../../MercadoPago/MercagoPago';
import { supabase } from '../../../SupaBase/conection'
import Modal from 'antd/lib/modal/Modal';
import { Pre_booking } from '../../Pre_booking/Pre_booking';
import countries, { Country } from 'countries-list'
import { RootReducer } from '../../../reducers/rootReducer';

const { Option } = Select;
export const prefixSelector = (
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


const paises: any = countries.countries
const countryCodes: string[] = Object.keys(paises);
const countryUnsortedNames: string[] = countryCodes.map(
    (code: string) => paises[code].name
);

const mapeo = countryUnsortedNames.map((e: any) => ({ value: e, label: e }))

export const residences = [
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

    const { pax_data, loading } = useSelector((state: RootReducer) => state.bookings); //pax_data
    const { user_data } = useSelector((state: RootReducer) => state.pre_booking);


    // const [uuid_match, setUuid_match] = useState(false)     //searchbar pax

    const [setInfo, setSetInfo] = useState(false)


    const bookings = useSelector((state: RootReducer) => state?.bookings)
    const { booking } = bookings

    const [mp, setMp] = useState<boolean>(false)
    const [mpModal, setMpModal] = useState<boolean>(false)


    useEffect(() => {
    }, [pax_data])


    const validator = (string?: any) => {
        for (var i = 0; i < 10; i++) {
            if (string.includes(i)) {
                setMp(false)
                return true
            }
        }
        return false
    }

    const handleClickBack = (e: SyntheticEvent) => {
        e.preventDefault();
        localStorage.removeItem("Accomodation")
        setMp(false)
        setSetInfo(false)
        dispatch(stepChange(1));
    }
    const onFinish = (values: PaxValues) => {
        sendPax(values)
    };



    const onChange = async (value: string, allvalues: any) => {
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
            early_checkin: booking.early_checkin,
            late_checkout: booking.late_checkout,
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
        if (
            supabase.auth.user()
            && !validator(allvalues.first_name)
            && !validator(allvalues.last_name)
            && !isNaN(allvalues.phone)) {
            setMp(true)
        }
    }


    const confirm_pax = (modal: string) => {
        let bookingInfo = {
            checkin: booking.range[0],
            checkout: booking.range[1],
            category: booking.category[0].category.name,
            type: booking.category[0].type.name,
            nights: booking.nights,
            unit_price: booking.fee,
            room_id: booking.room_id,
            uuid: pax_data.uuid,
            first_name: pax_data.first_name,
            last_name: pax_data.last_name,
            early_checkin: booking.early_checkin,
            late_checkout: booking.late_checkout,
            paxes: booking.guests,
            phone: pax_data.phone,
            country: pax_data.country,
            birth_date: pax_data.birth_date,
            address: pax_data.address,
            positive_balance: user_data[0].positive_balance
        }
        localStorage.setItem("BookingInfo", JSON.stringify(bookingInfo))
        modal === "modal" ? setMpModal(true) : setMp(true)

    }

    const [visible, setvisible] = useState(false)

    return (
        <div className='paxForm_containerPayment'>



            <div className="leftContainerPayment">
                <div className="backButtonPayment">
                    <Button size="large" onClick={handleClickBack} type="primary" >
                        BACK
               </Button>
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
                <div>
                    <Pre_booking type={1} />
                </div>
            </div>

            <div>
                <Modal
                    visible={visible}
                    width={450}
                    destroyOnClose={true}
                    footer={null}
                    onCancel={() => {
                        setvisible(false)
                    }}
                >
                    {
                        loading ?
                            <div>
                                Loading...
                                </div>
                            :
                            pax_data && setInfo ?
                                <ul>
                                    <div>First name : {pax_data.first_name}</div>
                                    <div>Last name : {pax_data.last_name}</div>
                                    <div>Uuid : {pax_data.uuid}</div>
                                    <div>Country : {pax_data.country}</div>
                                    <Button onClick={() => confirm_pax("modal")}>Confirm</Button>
                                    {mpModal ? <MercadoPago /> : null}
                                </ul>
                                :
                                <div>No hay nada</div>
                    }

                </Modal>

            </div>
            <div className='formBookingPayment'>
                <h1 className="Login">GUEST INFORMATION</h1>
                <div className="searchPaymentText2">If you don't have an account, please fill this form</div>

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
                            {
                                validator: async (_, firstName) => {
                                    if (validator(firstName)) {
                                        return Promise.reject(new Error("Words please"));
                                    }
                                },
                            }
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
                            {
                                validator: async (_, lastName) => {
                                    console.log(lastName)
                                    if (validator(lastName)) {
                                        return Promise.reject(new Error("Words please"));
                                    }
                                },
                            }
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
                        <Cascader placeholder="Country" options={mapeo} className='paxForm_input' />
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

                            {
                                validator: async (_, phone) => {
                                    if (isNaN(phone)) {
                                        setMp(false)
                                        return Promise.reject(new Error("Only numbers"));
                                    }
                                },
                            }
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