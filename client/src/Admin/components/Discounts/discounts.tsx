import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDiscounts, updateDiscounts, checkId, deleteDiscount,addDiscount } from '../../actions/discountsActions';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import {getAllCategories} from "../../actions/categoriesActions"
import { promotionType } from '../../../actions/Promotions/promotionsAction';
import './discounts.less'
import { Category } from '../Categories/Categories';
import moment from 'moment';

export interface IDiscounts {
    id: number,
    description: string,
    value: number,
    categoryToApply: number,
    releaseDate: string,
    expirationDate:string,
    published: boolean,
}

interface IFields {
    name: string[],
    value: string | number | boolean
}

const campos: IFields[] = [
    { name: ['id'], value: '' },
    { name: ['description'], value: '' },
    { name: ['value'], value: '' },
    { name: ['categoryToApply'], value: '' },
    { name: ['releaseDate'], value: '' },
    { name: ['expirationDate'], value: '' },
    { name: ['published'], value: '' },
]

export const Discounts = () =>{
    const { Option } = Select;
    const dispatch = useDispatch();
    const promotions:promotionType =  useSelector((state:any) => state.adminDiscounts.discounts)
    const categories =  useSelector((state:any) => state.categories.categories);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editId, setEditId] = useState<IDiscounts | null>(null);
    const [fields, setFields] = useState<IFields[]>(campos);
    const [form] = Form.useForm();
    const  adminDiscounts  = useSelector((state: any) => state?.adminDiscounts.discounts);
    
    useEffect(() => {
        dispatch(getAllCategories()) 
    
    }, [promotions, dispatch])
    
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },  {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        }, {
            title: 'Category to apply',
            dataIndex: 'categoryToApply',
            key: 'categoryToApply',
            render: (_: undefined, record:any) =>{
                const x = categories?.find((c:any) => c.id === record?.categoryToApply);
                if ( x ) return <span>{x.name}</span>
                else return <span>-</span>
            }
        },{
            title: 'Release date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        }, {
            title: 'Expiration date',
            dataIndex: 'expirationDate',
            key: 'expirationDate',
        }, 
        {
            title: 'Published',
            dataIndex: 'published',
            key: 'published',
            render: (_: undefined, record:any) =>{
                if(record.published){
                    return (
                        <span>
                            True
                        </span>
                    )
                }else{
                    return(
                        <span>False</span>
                    )
                    
                }
            }
        },{
            title: 'Action',
            dataIndex: 'operation',
            key: 'description',
            render: (_: undefined, record: { id: number }) =>
            adminDiscounts.length >= 1 ? (
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
        dispatch(getAllDiscounts());
    }, [dispatch]);

    const closeModal = () => {
        setFields(campos);
        setEditId(null);
        form.resetFields();
        setIsModalVisible(false);
    }

    const onFinish = (values: IDiscounts) => {
        if (editId) {
            const data = { ...values, id: editId.id, lastDescription: editId.description}
            dispatch(updateDiscounts(data));
            setIsModalVisible(false);
            setEditId(null);
        }
        else{
            dispatch(addDiscount(values));
            setIsModalVisible(false);
        }
    }

    const handleDelete = (id: number) => {
        const index = adminDiscounts.find((type: IDiscounts) => type.id === id);
        dispatch(deleteDiscount(index.id));
    }

    const handleEdit = (id: number) => {
        setIsModalVisible(true);
        const index = adminDiscounts.find((discount: IDiscounts) => discount.id === id);
        setEditId(index);
        setFields([
            { name: ['id'], value: index.id },
            { name: ['description'], value: index.description },
            { name: ['value'], value: index.value },
            { name: ['categoryToApply'], value: index.categoryToApply },
            { name: ['releaseDate'], value: moment(index.releaseDate) },
            { name: ['expirationDate'], value: moment(index.expirationDate) },
            { name: ['published'], value: index.published},
        ])
    }
    return (
        <div>
        <div className="types_upbar">
        <Button type="primary" onClick={() => setIsModalVisible(true)} >Add Discount</Button>
        </div>
        <Table
            dataSource={adminDiscounts}
            columns={columns}
            pagination={{ position: ['bottomCenter'] }}
            rowKey="releaseDate"
        />
        <Modal title="Add Type" visible={isModalVisible} onCancel={closeModal} footer={null} >
            <Form onFinish={onFinish} fields={fields} form={form} autoComplete="off">
                <Form.Item
                    label="ID"
                    name="id"
                    rules={[{
                        validator: async (_, e) => {
                            if (e.length > 3 && e !== fields[0].value) {
                                const q = await checkId(e)
                                if (q === "existe") {
                                    return Promise.reject(new Error('ID already registered'));
                                }
                            }
                        },
                        required: true
                    }]}>
                    <Input placeholder="Document"></Input>
                </Form.Item>
                <Form.Item
                    label="Category To Apply"
                    name="categoryToApply"
                    rules={[{ required: true, message: 'Please input a category!' }]}>
                        <Select style={{ width: "200px" }} >
                            {
                                categories.map((category: Category) => {
                                    return (<Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>)
                                })
                            }
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Release Date"
                    name="releaseDate"
                    rules={[{ required: true, message: 'Please input a Release Date!' }]}>
                          {/* <Input placeholder="releaseDate"></Input> */}
                    <DatePicker placeholder='Release Date' format='YYYY-MM-DD'/>
                </Form.Item>
                <Form.Item
                    label="Expiration Date"
                    name="expirationDate"
                    rules={[{ required: true, message: 'Please input a Expiration Date!' }]}>
                        {/* <Input placeholder="expirationDate"></Input> */}
                    <DatePicker placeholder='Expiration Date' format='YYYY-MM-DD'/>
                </Form.Item>
                <Form.Item
                    label="Value"
                    name="value"
                    rules={[{ required: true, message: 'Please input a value' }]}>
                    <Input placeholder="value"></Input>
                </Form.Item>          
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input a description!' }]}
                >
                    <Input placeholder="description"></Input>
                </Form.Item>
                <Form.Item
                    label="Published"
                    name="published"
                    
                >
                    <Select
                        placeholder="Select a published"
                        style={{ width: 190 }}
                        
                    >
                        <Option value='false' key='1'>False</Option>
                        <Option value='true' key='2'>True</Option>
                    </Select>
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
    </div >
)}