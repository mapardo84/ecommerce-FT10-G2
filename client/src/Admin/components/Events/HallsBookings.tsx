import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, DatePicker } from 'antd';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, deleteEvent, getAllHalls, getAllRequests, getBookedEvents, updateEvent } from '../../actions/adminEventsActions';
import moment from 'moment';
import { IHalls } from './Halls';
import { IRequests } from './HallsRequests';

export interface IBookedEvents {
    id:number;
    name:string;
    last_name:string;
    company:string,
    email:string;
    telephone:string;
    eventName:string;
    startDate:string;
    finishDate:string;
    methodPayment: string;
    hall_id:number;
};

interface IFields {
    name: string[],
    value: string | number
};

const campos: IFields[] = [
    { name: ['name'], value: ''},
    { name: ['last_name'], value: ''},
    { name: ['company'], value: ''},
    { name: ['email'], value: ''},
    { name: ['telephone'], value: ''},
    { name: ['eventName'], value: ''},
    { name: ['startDate'], value: ''},
    { name: ['finishDate'], value: ''},
    { name: ['methodPayment'], value: ''},
    { name: ['hall_id'], value: ''},
];

export const HallsBookings = () => {
    const dispatch = useDispatch();
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const [ editId, setEditId ] = useState<IBookedEvents|null>();
    const [ fields, setFields ] = useState<IFields[]>(campos);
    const [ bookedDate, setBookedDate ] = useState({
        start: '',
        end: ''
    });
    const [ freeHalls, setFreeHalls ] = useState([]);
    const [ form ] = Form.useForm();
    const bookings =  useSelector((state:any) => state.adminEvents.bookings);
    const halls = useSelector((state:any) => state?.adminEvents.halls);
    const requests = useSelector((state:any) => state?.adminEvents.requests);

    useEffect(() => {
        dispatch(getBookedEvents());
        dispatch(getAllHalls());
        dispatch(getAllRequests());
    }, [dispatch, bookings]);

    useEffect(() => {
        const crashedBookings = bookings.filter((b:IBookedEvents) => {
            return (
                (bookedDate.start >= b.startDate && bookedDate.start <= b.finishDate) ||
                (bookedDate.start <= b.startDate && bookedDate.end >= b.finishDate) ||
                (bookedDate.end >= b.startDate && bookedDate.end <= b.finishDate)
            )        
        });
        const busyHalls = crashedBookings.map((b:IBookedEvents) => {
            return b.hall_id;
        });
        console.log(busyHalls);
        setFreeHalls(halls.filter((h:IHalls) => {
            return !busyHalls.includes(h.id)
        }));
    }, [bookedDate])

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a:IRequests, b:IRequests) => a.name.length - b.name.length,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter: (a:IRequests, b:IRequests) => a.last_name.length - b.last_name.length,
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            sorter: (a:IRequests, b:IRequests) => a.company.length - b.company.length,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            sorter: (a:IRequests, b:IRequests) => a.email.length - b.email.length,
        } ,
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
        } ,
        {
            title: "Event's name",
            dataIndex: 'eventName',
            key: 'eventName',
            sorter: (a:IRequests, b:IRequests) => a.eventName.length - b.eventName.length,
        },  {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a:IRequests, b:IRequests) => a.startDate.length - b.startDate.length,
        }, {
            title: 'Finish Date',
            dataIndex: 'finishDate',
            key: 'finishDate',
            sorter: (a:IRequests, b:IRequests) => a.finishDate.length - b.finishDate.length,
        },{
            title: 'Payment Method',
            dataIndex: 'methodPayment',
            key: 'methodPayment',
            sorter: (a:IRequests, b:IRequests) => a.eventName.length - b.eventName.length,
        }, {
            title: 'Booked ID',
            dataIndex: 'hall_id',
            key: 'hall_id',
            render: (_: undefined, record:any) =>{
                const x = halls?.find((h:IHalls) => h.id === record?.hall_id);
                if ( x ) return <span>{x.name}</span>
                else return <span>-</span>
            }
        }, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'description',
            render: (_: undefined, record: { id:number }) =>
            bookings.length > 0 ? (
                <>
                    <Tooltip title="Edit">
                        <span className='adminrooms_options' onClick={() => handleEdit(record.id)}><FaPencilAlt size="18" color="orange" /> </span>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <span className='adminrooms_options'>
                            <Popconfirm placement="left" title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                                <FaTrashAlt size="18" color="red" />
                            </Popconfirm>
                        </span>
                    </Tooltip>
                </>
            ) : null,
        }
    ]
    const closeModal = () => {
        setFields(campos);
        setEditId(null);
        form.resetFields();
        setIsModalVisible(false);
    }

    const onFinish = (values:IBookedEvents) => {
        if (editId) {
            const data = { ...values, id: editId.id };
            dispatch(updateEvent(data));
            setIsModalVisible(false);
            setEditId(null);
        }
        else{
            dispatch(addEvent(values));
            setIsModalVisible(false);
        }
    }

    const handleDelete = ( id:number ) => {
        const index = bookings.find((b:IBookedEvents) => b.id === id);
        index? dispatch(deleteEvent(index.id)): console.log('nothing to delete');
    }

    const handleEdit = ( id:number ) => {
        setIsModalVisible(true);
        const index = bookings.find((booked:IBookedEvents) => booked.id === id);
        setEditId(index);
        setFields([
            { name: ['id'], value: index.id },
            { name: ['name'], value: index.name },
            { name: ['last_name'], value: index.last_name },
            { name: ['company'], value: index.company },
            { name: ['email'], value: index.email },
            { name: ['telephone'], value: index.telephone },
            { name: ['eventName'], value: index.eventName },
            { name: ['startDate'], value: moment(index.startDate) },
            { name: ['finishDate'], value: moment(index.finishDate) },
            { name: ['methodPayment'], value: index.methodPayment },
            { name: ['hall_id'], value: index.hall_id },
        ]);
    }

    const disabledDate = ((current:any) => {
        return current && current < moment().subtract(1, 'd');
    });

    return (
        <div>
            <div className="types_upbar">
                <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Booking</Button>
            </div>
            <Table
                dataSource={bookings}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="id"
            />
            <Modal title="Add Booking" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Form onFinish={onFinish} fields={fields} form={form} autoComplete="off">
                    <Form.Item
                        label="Name of Event"
                        name="eventName"
                        rules={[{ required: true, message: 'Please input a name!' }]}>
                        <Select style={{ width: "200px" }} >
                            {
                                requests.map((r:IRequests) => {
                                    return (<Select.Option key={r.id} value={r.eventName}>{r.eventName}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Start Date"
                        name="startDate"
                        rules={[{ required: true, message: 'Please input the start date!' }]}>
                        <DatePicker placeholder='Start Date' format='YYYY-MM-DD' disabledDate={disabledDate} 
                        onChange={(_value, mode) => setBookedDate({...bookedDate, start: mode})}/>
                    </Form.Item>
                    <Form.Item
                        label="Finish Date"
                        name="finishDate"
                        rules={[{ required: true, message: 'Please input the finish date!' }]}>
                        <DatePicker placeholder='Finish Date' format='YYYY-MM-DD' disabledDate={disabledDate}
                         onChange={(_value, mode) => setBookedDate({...bookedDate, end: mode})}/>
                    </Form.Item>
                    <Form.Item
                        label="Method Payment"
                        name="methodPayment"
                        rules={[{ required: true, message: 'Please input a method of payment!' }]}>
                        <Select style={{ width: "200px" }} >                            
                            <Select.Option key='cash' value='cash'>Cash</Select.Option>
                            <Select.Option key='card' value='card'>Card</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Hall"
                        name="hall_id"
                        rules={[{ required: true, message: 'Please input a hall!' }]}>
                        <Select style={{ width: "200px" }} >
                            {
                                freeHalls.map((hall:IHalls) => {
                                    return (<Select.Option key={hall.id} value={hall.id}>{hall.name}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input placeholder="name"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[{ required: true, message: 'Please input the last name!' }]}>
                        <Input placeholder="lastName"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Company"
                        name="company"
                        rules={[{ required: false, message: 'Please input a company'}]}>
                        <Input placeholder="company"></Input>
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Please input an email', type: 'email'}]}>
                        <Input placeholder="email"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Telephone"
                        name="telephone"
                        rules={[{ required: true, message: 'Please input a telephone'}]}>
                        <Input placeholder="telephone"></Input>
                    </Form.Item>
                    <div className="discounts">
                        <Button onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}