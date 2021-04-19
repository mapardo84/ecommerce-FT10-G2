import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, updateUser, checkEmail, checkUuid, resetPWD, deletUser } from '../../actions/usersActions';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import countries from "countries-list";
import './users.less'

export interface IUser {
    id: number,
    uuid: string | number,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    country: string,
    birth_date: string,
    address: string,
    role: string,
}

interface IFields {
    name: string[],
    value: string | number
}

const campos: IFields[] = [
    { name: ['uuid'], value: '' },
    { name: ['email'], value: '' },
    { name: ['first_name'], value: '' },
    { name: ['last_name'], value: '' },
    { name: ['phone'], value: '' },
    { name: ['country'], value: '' },
    { name: ['birth_date'], value: '' },
    { name: ['address'], value: '' },
    { name: ['role'], value: '' },
]

const { Option } = Select;
const paises: any = countries.countries;
const countryCodes: string[] = Object.keys(paises);
const countryUnsortedNames: string[] = countryCodes.map(
    (code: string) => paises[code].name
);
const countryNames = countryUnsortedNames.sort();

export const Users = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editId, setEditId] = useState<IUser | null>(null)
    const [fields, setFields] = useState<IFields[]>(campos);
    const [form] = Form.useForm();

    const { users } = useSelector((state: any) => state?.users)

    const dispatch = useDispatch()

    const columns: any = [
        {
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid'
        }, {
            title: 'e-mail',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
        }, {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (first_name: string) => (<>{first_name} {users.find((user: IUser) => user.first_name === first_name).last_name}</>),
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
        }, {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: 'Action',
            dataIndex: 'operation',
            key: 'name',
            render: (_: undefined, record: { id: number }) =>
                users.length >= 1 ? (
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
        dispatch(getAllUsers())
    }, [dispatch])

    const closeModal = () => {
        setFields(campos)
        setEditId(null)
        form.resetFields();
        setIsModalVisible(false)
    }

    const onFinish = (values: IUser) => {
        if (editId) {
            const data = { ...values, lastUUID: editId.uuid, lastEmail: editId.email, id: editId.id }
            console.log(data)
            dispatch(updateUser(data))
            setIsModalVisible(false)
            setEditId(null)
        }
    }

    const handleDelete = (id: number) => {
        const index = users.find((type: IUser) => type.id === id)
        dispatch(deletUser(index.id))
    }

    const handleEdit = (id: number) => {
        setIsModalVisible(true)
        const index = users.find((user: IUser) => user.id === id)
        setEditId(index)
        setFields([
            { name: ['uuid'], value: index.uuid },
            { name: ['email'], value: index.email },
            { name: ['first_name'], value: index.first_name },
            { name: ['last_name'], value: index.last_name },
            { name: ['birth_date'], value: index.birth_date },
            { name: ['phone'], value: index.phone },
            { name: ['country'], value: index.country },
            { name: ['address'], value: index.address },
            { name: ['role'], value: index.role },
        ])

    }

    const resetPw = () => {
        //console.log(editId?.email)
        resetPWD(editId ? editId.email : '')
    }




    return (
        <div>
            <div className="types_upbar">
            </div>
            <Table
                dataSource={users}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="email"
            />
            <Modal title="Add Type" visible={isModalVisible} onCancel={closeModal} footer={null} >
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
                    <span style={{ position: 'relative', minWidth: '100%' }}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                validator: async (_, e) => {
                                    if (e.includes("@") && e.includes(".") && e !== fields[1].value) {
                                        const q = await checkEmail(e)
                                        if (q === "existe") {
                                            return Promise.reject(new Error('Email already registered'));
                                        }
                                    }
                                },
                                required: true,
                            }]}>
                            <Input placeholder="Email" disabled></Input>
                        </Form.Item>
                    </span>
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
                        {/* <Input placeholder="Select Country"></Input> */}
                        <Select
                            //showSearch={true}
                            placeholder="Select a country"
                            // defaultValue="default"
                            style={{ width: 190 }}
                        // optionFilterProp="children"
                        // filterOption={(input, option: any) =>
                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                        /* onChange={handleChange} */
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
                        <Input placeholder="Birth Date"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input placeholder="Address"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                    >
                        <Select
                            placeholder="Select a role"
                            style={{ width: 190 }}
                        >
                            <Option value='user' key='1'>User</Option>
                            <Option value='admin' key='2'>Admin</Option>
                        </Select>
                    </Form.Item>

                    <div className="users_btn">
                        <Button onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button type="dashed" onClick={resetPw}>
                            Reset password
                        </Button>
                    </div>

                </Form>
            </Modal>
        </div >
    )
}
