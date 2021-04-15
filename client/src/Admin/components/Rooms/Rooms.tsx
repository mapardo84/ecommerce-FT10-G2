import { Button, Input, InputNumber, Select, Table, Form, Popconfirm, Tooltip } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRoom, deleteRoom, getAllRooms, updateRoom } from '../../actions/roomsActions';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import './rooms.less'
import { getCategories } from '../../../actions/index';

export interface Room {
    id: number,
    name: string,
    description: any,
    floor: number,
    availability: string,
    beds: number,
    category_id: number
    categories: { name: string }[]
}

interface ISort {
    name: number
}

const campos = [
    { name: ['name'], value: '' },
    { name: ['floor'], value: '' },
    { name: ['availability'], value: '' },
    { name: ['category'], value: '' },
    { name: ['beds'], value: '' },
]



export const Rooms = () => {
    const columns: any = [
        {
            title: 'Room Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ISort, b: ISort) => a.name - b.name,
        },
        {
            title: 'Floor',
            dataIndex: 'floor',
            key: 'floor',
            filters: [
                { text: '1st floor', value: 1 },
                { text: '2nd floor', value: 2 },
                { text: '3rd floor', value: 3 },
                { text: '4th floor', value: 4 },
                { text: '5th floor', value: 5 },
            ],
            filterMultiple: false,
            onFilter: (value: number, rooms: Room) => {
                return rooms.floor === value
            }
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
            filters: [
                { text: 'Availble', value: "available" },
                { text: 'Not available', value: "not available" },
            ],
            filterMultiple: false,
            onFilter: (value: string, rooms: Room) => {
                return rooms.availability === value
            }
        },
        {
            title: 'Category',
            dataIndex: 'categories',
            render: (categories: { name: string }) => (<>{categories.name}</>),
            key: 'categories',
            filters: [
                { text: 'Economic', value: 5 },
                { text: 'Standard(two)', value: 1 },
                { text: 'Standard (four)', value: 2 },
                { text: 'Suite', value: 3 },
                { text: 'Penthouse', value: 6 },
            ],
            filterMultiple: false,
            onFilter: (value: number, rooms: Room) => {
                return rooms.category_id === value
            }
        },
        {
            title: 'beds',
            dataIndex: 'beds',
            key: 'beds',
            filters: [
                { text: 'One bed', value: 1 },
                { text: 'Two beds', value: 2 },
                { text: 'Three beds', value: 3 },
            ],
            filterMultiple: false,
            onFilter: (value: number, rooms: Room) => {
                return rooms.beds === value
            }
        }, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_: undefined, record: { id: number }) =>
                roomsList.length >= 1 ? (
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
        },
    ]

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fields, setFields] = useState<any[]>(campos);
    const [editId, setEditId] = useState<any>(null)

    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { categories } = useSelector((state: any) => state?.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getCategories())
    }, [dispatch])

    const onFinish = (values: any) => {

        if (editId) {
            console.log('Values:', values);
            const data = { ...values, category_id: values.category_id, id: editId.id }
            console.log('Success:', data);
            dispatch(updateRoom(data))
            setIsModalVisible(false)
            setEditId(null)
        } else {
            console.log(values)
            dispatch(addRoom(values))
            setIsModalVisible(false)
        }
    };

    const handleDelete = (id: number) => {
        const index = roomsList.find((room: Room) => room.id === id)
        dispatch(deleteRoom(index.id))
    };


    const handleEdit = (id: number) => {
        setIsModalVisible(true)
        const index = roomsList.find((room: Room) => room.id === id)
        setEditId(index)
        console.log("El index: ", index)
        setFields([
            { name: ['name'], value: index.name },
            { name: ['floor'], value: index.floor },
            { name: ['availability'], value: index.availability },
            // { name: ['category_id'], value: index.category_id },
            { name: ['beds'], value: index.beds },
        ])
    }

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        setIsModalVisible(false)
    }


    return (
        <div>
            <div className="adminRooms_upbar">
                <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Room</Button>
            </div>
            <Table
                dataSource={roomsList}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="name"

            />
            <Modal title="Add Room" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Form onFinish={onFinish} fields={fields}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input a name!' }]}>
                        <Input placeholder="Room Name"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Floor"
                        name="floor"
                        rules={[{ required: true, message: 'Please input a floor!' }]}>
                        <InputNumber placeholder="Floor"></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="Availability"
                        name="availability"
                        rules={[{ required: true, message: 'Please input an availability!' }]}>
                        <Select style={{ width: "200px" }} placeholder="Select an availability">
                            <Select.Option value="available">Available</Select.Option>
                            <Select.Option value="not available">Not available</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category_id"
                        initialValue={editId?.category_id.toString()}
                        rules={[{ required: true, message: 'Please input a category!' }]}>
                        <Select style={{ width: "200px" }} placeholder="Select a category">
                            {
                                // categories.map(category =>{
                                //     <Select.Option value={category.id}>{category.name}</Select.Option>
                                // })
                            }
                            <Select.Option value="2">Standard</Select.Option>
                            <Select.Option value="3">Suite</Select.Option>
                            <Select.Option value="6">Penthouse</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Beds"
                        name="beds"
                        rules={[{ required: true, message: 'Please input a beds number!' }]}>
                        <InputNumber placeholder="Beds" min={1}></InputNumber>
                    </Form.Item>
                    <div className="adminrooms_btn">
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
