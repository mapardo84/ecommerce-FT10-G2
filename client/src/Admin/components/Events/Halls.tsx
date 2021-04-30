import { Button, Table, Form, Modal, Input, InputNumber, Tooltip, Popconfirm } from 'antd';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHalls } from '../../actions/adminEventsActions';

export interface IHalls {
    id:number;
    name:string;
    description:string;
    image:string;
};

interface IFields {
    name: string[],
    value: string | number
};

const campos: IFields[] = [
    { name: ['name'], value: '' },
    { name: ['description'], value: '' },
    { name: ['image'], value: '' },
];
  
export const Halls = () => {
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const [ editId, setEditId ] = useState<null | IHalls>(null)
    const [ fields, setFields ] = useState<IFields[]>(campos);
    const halls = useSelector((state: any) => state?.adminEvents.halls);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllHalls());
    }, [dispatch, halls]);

    const handleEdit = ( id:number ) => {
        setIsModalVisible(true)
        const index = halls.find((halls: IHalls) => halls.id === id)
        setEditId(index)
        setFields([
            { name: ['name'], value: index.name },
            { name: ['description'], value: index.description },
            { name: ['image'], value: index.image },
        ])
    }

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        setIsModalVisible(false)
    }

    const onFinish = (values: IHalls) => {
        if (editId) {
            const data = { ...values, id: editId.id }
            // dispatch(updateType(data))
            setIsModalVisible(false)
            setEditId(null)
        } else {
            // dispatch(addType(values))
            setIsModalVisible(false)
        }
    }

    const handleDelete = (id: number) => {
        const index = halls.find((type: IHalls) => type.id === id)
        // dispatch(deleteType(index.id))
    };

    const columns:any = [
        {
            title: 'Type Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a:IHalls, b:IHalls) => a.name.length - b.name.length,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        }, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_: undefined, record: { id: number }) =>
                halls.length > 0 ? (
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

    console.log(halls);
    return (
        <div>
            <div className="halls_upbar">
                <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Hall</Button>
            </div>
            <Table
                dataSource={halls}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="name"
            />
            <Modal title="Add Hall" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Form onFinish={onFinish} fields={fields}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input a name!' }]}>
                        <Input placeholder="name"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input a description!' }]}>
                        <Input placeholder="description"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Image (URL)"
                        name="image"
                        rules={[{ required: true, message: 'Please input an url' }]}>
                        <Input placeholder="image"></Input>
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
    );
};