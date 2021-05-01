import { Button, Table, Form, Modal, Input, InputNumber, Tooltip, Popconfirm } from 'antd';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './types.less'
import { deleteType, getAllTypes, addType, updateType } from '../../actions/typesActions';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';


export interface IType {
    id: number;
    name: string;
    capacity: number;
    beds: number;
}

interface IFields {
    name: string[],
    value: string | number
}

interface ISort {
    name: number
    beds: number
}

const campos: IFields[] = [
    { name: ['name'], value: '' },
    { name: ['capacity'], value: '' },
    { name: ['beds'], value: '' },
]

export const Types = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editId, setEditId] = useState<null | IType>(null)
    const [fields, setFields] = useState<IFields[]>(campos);

    const { types } = useSelector((state: any) => state?.types)

    const dispatch = useDispatch()

    const columns: any = [
        {
            title: 'Type Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: IType, b: IType) => a.name.length - b.name.length,
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity'
        },
        {
            title: 'Beds',
            dataIndex: 'beds',
            key: 'beds',
            sorter: (a: ISort, b: ISort) => a.beds - b.beds,
        }, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_: undefined, record: { id: number }) =>
                types.length >= 1 ? (
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

    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch])

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        setIsModalVisible(false)
    }

    const onFinish = (values: IType) => {
        if (editId) {
            const data = { ...values, id: editId.id }
            dispatch(updateType(data))
            setIsModalVisible(false)
            setEditId(null)
        } else {
            dispatch(addType(values))
            setIsModalVisible(false)
        }
    }

    const handleDelete = (id: number) => {
        const index = types.find((type: IType) => type.id === id)
        dispatch(deleteType(index.id))
    };

    const handleEdit = (id: number) => {
        setIsModalVisible(true)
        const index = types.find((type: IType) => type.id === id)
        setEditId(index)
        setFields([
            { name: ['name'], value: index.name },
            { name: ['capacity'], value: index.capacity },
            { name: ['beds'], value: index.beds },
        ])
    }
    return (
        <div>
            <div className="types_upbar">
                <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Type</Button>
            </div>
            <Table
                dataSource={types}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="name"
            />
            <Modal title="Add Type" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Form onFinish={onFinish} fields={fields}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input a name!' }]}>
                        <Input placeholder="Type Name"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Capacity"
                        name="capacity"
                        rules={[{ required: true, message: 'Please input a capacity!' }]}>
                        <InputNumber placeholder="Capacity"></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="Beds"
                        name="beds"
                        rules={[{ required: true, message: 'Please input a number of beds!' }]}>
                        <InputNumber placeholder="Beds"></InputNumber>
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
