import { Button, Form, Input, Select } from "antd";
//import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal"
import countries from "countries-list";
import { useState } from "react";
import { addPaxes, checkUuid } from "../../actions/paxesActions";
import { useDispatch } from 'react-redux';
import { IPaxes } from "../Paxes/Paxes";

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

const paises: any = countries.countries;
const countryCodes: string[] = Object.keys(paises);
const countryUnsortedNames: string[] = countryCodes.map(
    (code: string) => paises[code].name
);
const countryNames = countryUnsortedNames.sort();

export const CheckinAddPaxes = ({ setModal, setPax, setPaxName, firstModal, created }: { setModal: Function, setPax: Function, setPaxName: Function, firstModal: Function, created: Function }): JSX.Element => {
    const [fields, setFields] = useState<IFields[]>(campos);
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const onFinish = (values: IPaxes) => {
        dispatch(addPaxes(values))
        setModal(false)
        created(values.uuid)
        firstModal(true)

    }

    const closeModal = () => {
        setModal(false)
    }

    return (
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
                    <Select.Option value="default">---Select a country---</Select.Option>
                    {countryNames.map((country: string, key: number) => (
                        <Select.Option value={country} key={key}>
                            {country}
                        </Select.Option>
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


            <div className="users_btn">
                <Button onClick={closeModal}>
                    Cancel
                        </Button>
                <Button type="primary" htmlType="submit">
                    Save
                        </Button>
            </div>

        </Form>
    )
}
