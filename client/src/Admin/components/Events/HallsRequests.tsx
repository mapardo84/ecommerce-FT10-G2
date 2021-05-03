import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, DatePicker, InputNumber } from 'antd';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, deleteRequest, getAllRequests, updateRequest } from '../../actions/adminEventsActions';
import moment from 'moment';

export interface IRequests {
    id:number;
    name:string;
    last_name:string;
    company:string;
    email:string;
    telephone:string;
    startDate:string;
    finishDate:string;
    eventName:string;
    requestSalon:number;
    requestCatering:string;
    additionalServices:string;
    comments:string;
    type:string;
};

interface IFields {
    name: string[],
    value: string | number
};

const campos: IFields[] = [
    { name: ['name'], value: '' },
    { name: ['last_name'], value: '' },
    { name: ['company'], value: '' },
    { name: ['email'], value: '' },
    { name: ['telephone'], value: '' },
    { name: ['startDate'], value: '' },
    { name: ['finishDate'], value: '' },
    { name: ['eventName'], value: '' },
    { name: ['requestSalon'], value: '' },
    { name: ['requestCatering'], value: '' },
    { name: ['additionalServices'], value: '' },
    { name: ['comments'], value: '' },
    { name: ['type'], value: '' },
];
  
export const HallsRequests = () => {
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const [ editId, setEditId ] = useState<null | IRequests>(null)
    const [ fields, setFields ] = useState<IFields[]>(campos);
    const requests = useSelector((state:any) => state?.adminEvents.requests);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllRequests());
    }, [dispatch, requests]);

    const handleEdit = ( id:number ) => {
        setIsModalVisible(true)
        const index = requests.find((r:IRequests) => r.id === id)
        setEditId(index)
        setFields([
            { name: ['name'], value: index.name },
            { name: ['last_name'], value: index.last_name },
            { name: ['company'], value: index.company },
            { name: ['email'], value: index.email },
            { name: ['telephone'], value: index.telephone },
            { name: ['startDate'], value: moment(index.startDate) },
            { name: ['finishDate'], value: moment(index.finishDate) },
            { name: ['eventName'], value: index.eventName },
            { name: ['requestSalon'], value: index.requestSalon },
            { name: ['requestCatering'], value: index.requestCatering },
            { name: ['additionalServices'], value: index.additionalServices },
            { name: ['comments'], value: index.comments },
            { name: ['type'], value: index.type },
        ])
    }

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        setIsModalVisible(false)
    }

    const onFinish = (values:IRequests) => {
        if (editId) {
            const data = { ...values, id: editId.id }
            dispatch(updateRequest(data));
            setIsModalVisible(false);
            setEditId(null);
        } else {
            dispatch(addRequest(values));
            setIsModalVisible(false);
        }
    }

    const handleDelete = (id: number) => {
        const index = requests.find((r:IRequests) => r.id === id)
        dispatch(deleteRequest(index.id));
    };

    const disabledDate = ((current:any) => {
        return current && current < moment().subtract(1, 'd');
    });

    const columns:any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a:IRequests, b:IRequests) => a.name.length - b.name.length,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'lastName',
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
            sorter: (a:IRequests, b:IRequests) => a.telephone.length - b.telephone.length,
        } ,
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a:IRequests, b:IRequests) => a.startDate.length - b.startDate.length,
        } ,
        {
            title: 'Finish Date',
            dataIndex: 'finishDate',
            key: 'finishDate',
            sorter: (a:IRequests, b:IRequests) => a.finishDate.length - b.finishDate.length,
        } ,
        {
            title: "Event's name",
            dataIndex: 'eventName',
            key: 'eventName',
            sorter: (a:IRequests, b:IRequests) => a.eventName.length - b.eventName.length,
        } ,
        {
            title: 'Request Salon',
            dataIndex: 'requestSalon',
            key: 'requestSalon',
            // sorter: (a:IRequests, b:IRequests) => a.requestSalon.length - b.requestSalon.length,
        } ,
        {
            title: 'Request Catering',
            dataIndex: 'requestCatering',
            key: 'requestCatering',
        } ,
        {
            title: 'Additional services',
            dataIndex: 'additionalServices',
            key: 'additionalServices',
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            // sorter: (a:IRequests, b:IRequests) => a.requestSalon.length - b.requestSalon.length,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_: undefined, record: { id: number }) =>
                requests.length > 0 ? (
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
                ) 
            : null,
        }
    ]
    
    return (
        <div>
            <div className="halls_upbar">
                <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Request</Button>
            </div>
            <Table
                dataSource={requests}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="eventName"
            />
            <Modal title="Add Request" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Form onFinish={onFinish} fields={fields}>
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
                        label="Telephone"
                        name="telephone"
                        rules={[{ required: true, message: 'Please input a telephone'}]}>
                        <Input placeholder="telephone"></Input>
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Please input an email', type: 'email'}]}>
                        <Input placeholder="email"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Start Date"
                        name="startDate"
                        rules={[{ required: true, message: 'Please input the start date' }]}>
                        <DatePicker placeholder='Start Date' format='YYYY-MM-DD' disabledDate={disabledDate}/>
                    </Form.Item>
                    <Form.Item
                        label="Finish Date"
                        name="finishDate"
                        rules={[{ required: true, message: 'Please input the finish date' }]}>
                        <DatePicker placeholder='Finish Date' format='YYYY-MM-DD' disabledDate={disabledDate}/>
                    </Form.Item>
                    <Form.Item
                        label="Event's name"
                        name="eventName"
                        rules={[{ required: false, message: "Please input the event's name" }]}>
                        <Input placeholder="eventName"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Request Salon"
                        name="requestSalon"
                        rules={[{ required: true, message: 'Please input number of people' }]}>
                        <InputNumber placeholder="requestSalon" min='1' max='200'></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="Request Catering"
                        name="requestCatering"
                        rules={[{ required: false, message: 'Please input catering requisition' }]}>
                        <Input placeholder="requestCatering"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Additional Services"
                        name="additionalServices"
                        rules={[{ required: false, message: 'Please input additional services' }]}>
                        <Input placeholder="additionalServices"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Comments"
                        name="comments"
                        rules={[{ required: false, message: 'Please input comments' }]}>
                        <Input placeholder="comments"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input type of event' }]}>
                        <Select style={{ width: "200px" }} >
                            <Select.Option value='Social'>Social</Select.Option>
                            <Select.Option value='Business'>Business</Select.Option>
                        </Select>
                    </Form.Item>
                    <div className="types_btn">
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