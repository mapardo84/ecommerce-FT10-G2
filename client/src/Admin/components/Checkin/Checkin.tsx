import { Button, Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRooms } from '../../actions/roomsActions';
import './checkin.less'
import { Category } from '../Categories/Categories';
import { getAllCategories } from '../../actions/categoriesActions';
import { getAllTypes } from '../../actions/typesActions';
import { IType } from '../Types/Types';
import { saveRoomSelected } from '../../actions/checkinActions';
import { changeRoomAvailable } from '../../actions/roomsActions';

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
    const [loaded, setLoaded] = useState(false)

    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { categories } = useSelector((state: any) => state?.categories)
    const { types } = useSelector((state: any) => state?.types)
    const { roomId } = useSelector((state: any) => state?.checkin)

    const dispatch = useDispatch()

    const columns: any = [
        {
            title: 'Room Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Room, b: Room) => a.name.localeCompare(b.name),
            render: (_: undefined, record: Room) => {
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
                        <Tag className="checkin_pinter" color='blue' key={record.id} onClick={() => {
                            setIsModalVisible(true)
                            dispatch(saveRoomSelected(record.id))
                        }}>
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
                return rooms.type_id === value
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
            render: (_: undefined, record: Room) => {
                const categoryPrice = categories?.find((category: Category) => category.id === record.category_id).price
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

    const changeToAvailable = () => {
        dispatch(changeRoomAvailable(roomId))
        setIsModalVisible(false)
    }

    const closeModal = () => {
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
            <Modal title="Change Availability" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Button
                    onClick={changeToAvailable}
                    type='primary'
                    className='types_upbar'
                >
                    Change to Available
            </Button>
                <div>
                    <Button onClick={closeModal}
                        className='types_upbar'
                    >
                        Cancel
            </Button>
                </div>
            </Modal>
        </div>
    )
}
