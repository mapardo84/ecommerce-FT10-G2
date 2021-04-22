import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, Space,Checkbox  } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDiscounts, updateDiscounts, checkId, deleteDiscount,addDiscount } from '../../actions/discountsActions';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import './discounts.less'
import { supabase } from '../../../SupaBase/conection'

import { SearchOutlined } from '@ant-design/icons';

const idToName = async (id: number) =>{
    var  data:any  = await supabase
    .from('categories')
    .select('name')
    .eq('id', id)
   console.log(data.data[0].name) 
}


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

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editId, setEditId] = useState<IDiscounts | null>(null)
    const [fields, setFields] = useState<IFields[]>(campos);
    const [form] = Form.useForm();

  

    const  adminDiscounts  = useSelector((state: any) => state?.adminDiscounts.discounts)

    const dispatch = useDispatch()

    const handleSearch = (selectedKeys: string, confirm: Function, dataIndex: string) => {
        confirm();
    };

    const handleReset = (clearFilters: Function) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: {
            setSelectedKeys: Function;
            selectedKeys: string;
            confirm: Function;
            clearFilters: Function;
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 30 }}
                    ></Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 60, marginLeft: "52px" }}
                    >
                        Reset
              </Button>
                    <Button
                        type="link"
                        size="small"
                        style={{ marginLeft: "120px" }}
                        onClick={() => {
                            confirm({ closeDropdown: false });
                        }}
                    >
                        Filter
              </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: string, record: any) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        render: (text: string) => text,
    });
  
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
            // render: (_: undefined, record:any) =>{
            //    if (record.categoryToApply){
            //     return (
            //         <span>
            //          {idToName(record.id)}
            //         </span>
            //     )
            //    }
            // }
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
            // render: (_: undefined, record: { id: number }) =><Checkbox onChange={onChange}></Checkbox>
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
        dispatch(getAllDiscounts())
        console.log(adminDiscounts)
    }, [dispatch])
    

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        form.resetFields();
        setIsModalVisible(false)
    }

    const onFinish = (values: IDiscounts) => {
        if (editId) {
            const data = { ...values, id: editId.id, lastDescription: editId.description}
            dispatch(updateDiscounts(data))
            setIsModalVisible(false)
            setEditId(null)
        }
        else{
            dispatch(addDiscount(values))
            setIsModalVisible(false)
        }
    }

    const handleDelete = (id: number) => {
        const index = adminDiscounts.find((type: IDiscounts) => type.id === id)
        dispatch(deleteDiscount(index.id))
    }

    const handleEdit = (id: number) => {
        setIsModalVisible(true)
        const index = adminDiscounts.find((discount: IDiscounts) => discount.id === id)
        setEditId(index)
        setFields([
            { name: ['id'], value: index.id },
            { name: ['description'], value: index.description },
            { name: ['value'], value: index.value },
            { name: ['categoryToApply'], value: index.categoryToApply },
            { name: ['releaseDate'], value: index.releaseDate },
            { name: ['expirationDate'], value: index.expirationDate },
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
                    rules={[{ required: true, message: 'Please input a categoryToApply!' }]}>
                    <Input placeholder="categoryToApply"></Input>
                </Form.Item>
                
            
             
                <Form.Item
                    label="Release Date"
                    name="releaseDate"
                >
                    <Input placeholder="releaseDate"></Input>
                </Form.Item>
                <Form.Item
                    label="Expiration Date"
                    name="expirationDate"
                >
                    <Input placeholder="expirationDate"></Input>
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
                    rules={[{ required: true, message: 'Please input a description!' }]}>
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
                        <Option value='false' key='1'>false</Option>
                        <Option value='true' key='2'>true</Option>
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
)
}