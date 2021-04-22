import { Button, Input, InputNumber, Select, Table, Form, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRoom, getAllRooms, updateRoom } from '../../actions/roomsActions';
import './checkin.less'
import { Category } from '../Categories/Categories';
import { getAllCategories } from '../../actions/categoriesActions';
import { getAllTypes } from '../../actions/typesActions';
import { IType } from '../Types/Types';
import { saveRoomSelected } from '../../actions/checkinActions';

export interface Room {
    id: number;
    name: string;
    description: string;
    floor: number;
    availability: string;
    category_id: number | string;
    type_id: number | string;
    categories: { name: string }[];
}

interface IFields {
    name: string[],
    value: string | number
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

const numberFloor = (rooms: Room[]) => {
    let floors = rooms.map((floor) => {
        return floor.floor
    });
    return Array.from(new Set([...floors])).map((floor) => ({ text: `floor #${floor}`, value: floor }));
}


export const Checkin = ({ steps }: { steps: Function }): JSX.Element => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fields, setFields] = useState<IFields[]>(campos);
    const [editId, setEditId] = useState<null | Room>(null)
    const [loaded, setLoaded] = useState(false)

    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { categories } = useSelector((state: any) => state?.categories)
    const { types } = useSelector((state: any) => state?.types)
    const dispatch = useDispatch()

    const columns: any = [
        {
            title: 'Room Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Room, b: Room) => a.name.localeCompare(b.name),
            render: (_: any, record: any) => {
                //console.log(record)
                if (record.availability === 'available') {
                    return (
                        <Tag className="checkin_pinter" color='green' key={record.id} onClick={() => { steps(1); dispatch(saveRoomSelected(record.id)) }}>
                            {record.name}
                        </Tag>
                    )
                } else if (record.availability === 'not available') {
                    return (
                        <Tag className="checkin_pinter" color='red' key={record.id} onClick={() => { steps(1); dispatch(saveRoomSelected(record.id)) }}>
                            {record.name}
                        </Tag>
                    )
                } else if (record.availability === 'cleaning') {
                    return (
                        <Tag className="checkin_pinter" color='blue' key={record.id} onClick={() => { steps(1); dispatch(saveRoomSelected(record.id)) }}>
                            {record.name}
                        </Tag>
                    )
                }
            }
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
            filters: [
                { text: 'Availble', value: "available" },
                { text: 'Cleaning', value: "cleaning" },
                { text: 'Not available', value: "not available" },
            ],
            filterMultiple: false,
            onFilter: (value: string, rooms: Room) => {
                return rooms.availability === value
            }
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
                return rooms.category_id === value
            }
        },
        {
            title: 'Price per night',
            dataIndex: 'category_id',
            key: 'price',
            //filters: filterPrice(roomsList, categories, types),
            //filterMultiple: false,
            // onFilter: (value: any) => {
            //     //console.log(a)
            //     return rooms.category_id === value
            // },
            render: (_: any, record: any) => {
                const categoryPrice = categories.find((category: Category) => category.id === record.category_id).price
                const roomType = types.find((type: IType) => type.id === record.type_id)?.beds
                return (<>USD {categoryPrice * roomType}</>)
            },
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            // render: (_: undefined, record: { id: number }) =>
            //     roomsList.length >= 1 ? (
            //         <>
            //             <Tooltip title="Edit">
            //                 <span className='adminrooms_options' onClick={() => handleEdit(record.id)}><FaPencilAlt size="18" color="orange" /> </span>
            //             </Tooltip>
            //             <Tooltip title="Delete">
            //                 <span className='adminrooms_options'>
            //                     <Popconfirm placement="left" title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            //                         <FaTrashAlt size="18" color="red" />
            //                     </Popconfirm>
            //                 </span>
            //             </Tooltip>
            //         </>
            //     ) : null,
        },
    ]

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllCategories())
        dispatch(getAllTypes())
    }, [dispatch])

    useEffect(() => {
        if (categories.length > 0 && types.length > 0 && roomsList.length > 0) {
            setLoaded(true)
        }

    }, [categories, types, roomsList])

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

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        setIsModalVisible(false)
    }


    return (
        <div>
            <div className="adminRooms_upbar">
                {/* <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Room</Button> */}
            </div>
            {loaded &&
                <Table
                    dataSource={roomsList}
                    columns={columns}
                    pagination={{ position: ['bottomCenter'] }}
                    rowKey="name"

                />
            }
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
