import { ReactElement } from 'react'
import { Button, Table, Form, Modal, Input } from 'antd';
import { AddSub } from '../../../actions/addNewsletterSub/index';
import {useDispatch} from 'react-redux';

interface Props {

}

export function HomeNewsletter({ }: Props): ReactElement {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish= (values:{Email:string})=>{
        dispatch(AddSub(values.Email))
        form.resetFields();
    }



    return (
        <div>
            <Form form={form} autoComplete='off' onFinish={onFinish}>
                <Form.Item
                    label='Newsletter subscription'
                    name='Email'
                    rules={[
                        { required: true, message: "Please insert your e-mail!" },
                        { type: "email", message: "The input is not valid e-mail!" },
                    ]}
                    >
                    <Input placeholder='Enter your email...'></Input>
                </Form.Item>
                <Button type='primary' htmlType='submit'>
                    Subscribe
                </Button>
            </Form>
        </div>
    )
}

