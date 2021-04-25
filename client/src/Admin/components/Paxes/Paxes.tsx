import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, Space, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPaxes, updatePaxes, deletPaxes,checkUuid, addPaxes } from '../../actions/paxesActions'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import countries from "countries-list";
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

export interface IPaxes {
    id: number,
    uuid: string | number,
    first_name: string,
    last_name: string,
    phone: string,
    country: string,
    birth_date: string,
    address: string,
    titular: boolean
}

interface IFields {
    name: string[],
    value: string | number 
}

const campos: IFields[] = [
    { name: ['uuid'], value: '' },
    { name: ['first_name'], value: '' },
    { name: ['last_name'], value: '' },
    { name: ['phone'], value: '' },
    { name: ['country'], value: '' },
    { name: ['birth_date'], value: '' },
    { name: ['address'], value: '' },
    { name: ['titular'], value: '' },
]

const { Option } =Select;
const paises: any = countries.countries;
const countryCodes: string[] = Object.keys(paises);
const countryUnsortedNames: string[] = countryCodes.map(
    (code: string) => paises[code].name
);
const countryNames = countryUnsortedNames.sort();

export const Paxes = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editId, setEditId] = useState<IPaxes | null>(null)
    const [fields, setFields] = useState<IFields[]>(campos);
    const [form] = Form.useForm();
    
    const { paxes } = useSelector((state: any) => state?.paxes)

    const dispatch = useDispatch();

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
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid'
        }, {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            ...getColumnSearchProps("first_name"),
            render: (first_name: string) => (<>{first_name} {paxes.find((pax: IPaxes) => pax.first_name === first_name).last_name}</>),
            sorter: (a:IPaxes , b: IPaxes) => a.first_name.localeCompare(b.first_name) 
        }, {
            title: 'Birth Date',
            dataIndex: 'birth_date',
            key: 'birth_date',
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }/* , {
            title: 'Titular',
            dataIndex: 'titular',
            key: 'titular',
            render: (_: undefined, record:any) =>{
                if(record.titular){
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
        } */, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_: undefined, record: { id: number }) =>
                paxes.length >= 1 ? (
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
        dispatch(getAllPaxes())
    }, [dispatch])

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        form.resetFields();
        setIsModalVisible(false)
    }

    const onFinish = (values: IPaxes) => {
        if (editId) {
            const data = { ...values, lastUUID: editId.uuid, id: editId.id }
            
            dispatch(updatePaxes(data))
            setIsModalVisible(false)
            setEditId(null)
        }else{
            dispatch(addPaxes(values))
            setIsModalVisible(false)
        }
    }

    const handleDelete = (id: number) => {
        const index = paxes.find((type: IPaxes) => type.id === id)
        dispatch(deletPaxes(index.id))
    }

    const handleEdit = (id: number) => {
        setIsModalVisible(true)
        const index = paxes.find((user: IPaxes) => user.id === id)
        setEditId(index)
        setFields([
            { name: ['uuid'], value: index.uuid },
            { name: ['first_name'], value: index.first_name },
            { name: ['last_name'], value: index.last_name },
            { name: ['birth_date'], value: moment(index.birth_date) },
            { name: ['phone'], value: index.phone },
            { name: ['country'], value: index.country },
            { name: ['address'], value: index.address },
            { name: ['titular'], value: index.titular },
        ])

    }
    
 
    return (
        <div>
            <div>
                <Button 
                type='primary'
                onClick = {()=> setIsModalVisible(true)}
                className='types_upbar'
                >
                    Create Pax
                </Button>
            </div>

             <div className="types_upbar">
            </div>
            <Table
                dataSource={paxes}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="uuid"
            />
    
            <Modal title="Add Pax" visible={isModalVisible} onCancel={closeModal} footer={null} >
                <Form onFinish={onFinish} fields={fields} form={form} autoComplete="off">
                    <Form.Item
                        label="UUID"
                        name="uuid"
                        rules={[{
                            validator: async (_, e) => {
                                if (e.length > 3 && e !== fields[0].value) {
                                    const q = await checkUuid(e)
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
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: 'Please input a first name!' }]}>
                        <Input placeholder="First Name"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[{ required: true, message: 'Please input a last name!' }]}>
                        <Input placeholder="Last Name"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    >
                        <Input placeholder="Phone Number"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        name="country"
                    >
                        <Select
                            placeholder="Select a country"
                            style={{ width: 190 }}
                        >
                            <Option value="default">---Select a country---</Option>
                            {countryNames.map((country: string, key: number) => (
                                <Option value={country} key={key}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Birth Date"
                        name="birth_date"
                        rules={[{ required: true, message: 'Please input a birth date!' }]}>
                        <DatePicker placeholder='Birth Date' format='YYYY-MM-DD'/>
                        {/* <Input placeholder="YYYY-MM-DD"></Input> */}
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input placeholder="Address"></Input>
                    </Form.Item>


                    <div className="users_btn">
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
