import { Button, Input, InputNumber, Select, Table, Form, Popconfirm, Tooltip } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRoom, deleteRoom, getAllRooms, updateRoom } from '../../actions/roomsActions';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import './rooms.less'
import { Category } from '../Categories/Categories';
import { getAllCategories } from '../../actions/categoriesActions';
import { getAllTypes } from '../../actions/typesActions';
import { IType } from '../Types/Types';

export interface Room {
    id: number;
    name: string;
    description: string;
    floor: number;
    availability: string;
    category_id: number | string;
    type_id: number | string;
    categories: { name: string }[];
    curent_pax: number;
    curent_booking: number;
}

interface IFields {
    name: string[],
    value: string | number
}

interface ISort {
    name: number
}

const campos: IFields[] = [
    { name: ['name'], value: '' },
    { name: ['floor'], value: '' },
    { name: ['availability'], value: '' },
    { name: ['category'], value: '' },
    { name: ['beds'], value: '' },
]

const filterData = (data: Category[]) => {
    return data.map((category: Category) => {
        return { text: category.name, value: category.id }
    })
}

// const numberBeds = (rooms: Room[]) => {
//     let beds = rooms.map((room) => {
//         return room.beds
//     });
//     return Array.from(new Set([...beds])).map((bed) => ({ text: bed === 1 ? `1 bed` : `${bed} beds`, value: bed }));
// }

const numberFloor = (rooms: Room[]) => {
    let floors = rooms.map((floor) => {
        return floor.floor
    });
    return Array.from(new Set([...floors])).map((floor) => ({ text: `floor #${floor}`, value: floor }));
}


export const Rooms = () => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fields, setFields] = useState<IFields[]>(campos);
    const [editId, setEditId] = useState<null | Room>(null)

    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { categories } = useSelector((state: any) => state?.categories)
    const { types } = useSelector((state: any) => state?.types)
    const dispatch = useDispatch()

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
            filters: numberFloor(roomsList),
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
            dataIndex: 'category_id',
            render: (category_id: number) => (<>{categories.find((category: Category) => category.id === category_id)?.name}</>),
            key: 'category_id',
            filters: filterData(categories),
            filterMultiple: false,
            onFilter: (value: number, rooms: Room) => {
                return rooms.category_id === value
            }
        },
        {
            title: 'Type',
            dataIndex: 'type_id',
            render: (type_id: number) => (<>{types.find((type: IType) => type.id === type_id)?.name}</>),
            key: 'type_id',
            filters: filterData(types),
            filterMultiple: false,
            onFilter: (value: number, rooms: Room) => {
                return rooms.type_id === value
            }
        },
        {
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

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllCategories())
        dispatch(getAllTypes())
    }, [dispatch])

    const onFinish = (values: Room) => {

        if (editId) {
            //chequear que lo que llega en los select si sea numeros... culpa de ant!
            if (categories.some((category: Category) => category.name === values.category_id)) {
                values.category_id = categories.find((category: Category) => category.name === values.category_id)?.id
            }
            if (types.some((type: IType) => type.name === values.type_id)) {
                values.type_id = types.find((type: IType) => type.name === values.type_id)?.id
            }

            const data = { ...values, category_id: Number(values.category_id), type_id: Number(values.type_id), id: editId.id }
            dispatch(updateRoom(data))
            setIsModalVisible(false)
            setEditId(null)
        } else {
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
        setFields([
            { name: ['name'], value: index.name },
            { name: ['floor'], value: index.floor },
            { name: ['availability'], value: index.availability },
            { name: ['category_id'], value: categories.find((category: Category) => category.id === index.category_id)?.name },
            { name: ['type_id'], value: types.find((type: IType) => type.id === index.type_id)?.name },
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
                        //valuePropName='option'
                        //defaultValue={[{id: editId?.category_id, name:'nombre'}]} 
                        rules={[{ required: true, message: 'Please input a category!' }]}>
                        <Select style={{ width: "200px" }} >
                            {
                                categories.map((category: Category) => {
                                    return (<Select.Option key={category.id} value={category.id.toString()}>{category.name}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type_id"
                        rules={[{ required: true, message: 'Please input a type!' }]}>
                        <Select style={{ width: "200px" }} placeholder="Select a type" >
                            {
                                types.map((type: IType) => {
                                    return (<Select.Option key={type.id} value={type.id.toString()}>{type.name}</Select.Option>)
                                })
                            }
                        </Select>
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
