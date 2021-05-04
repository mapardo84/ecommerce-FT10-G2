import { ReactElement, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import { AddSub, GetSub, UpdateSub } from '../../../actions/addNewsletterSub/index';
import { useDispatch, useSelector } from 'react-redux';

interface Props {

}

export function HomeNewsletter({ }: Props): ReactElement {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const emailsCancelled = useSelector((state: any) => state.newsletterSubsReducer.newslettersCancelled)

    let emailsCancelledMap = emailsCancelled.map((e: any) => {
        return e.email
    })

    const onFinish = (values: { Email: string }) => {
        if (emailsCancelledMap.includes(values.Email)) {
            dispatch(UpdateSub(values.Email))
            form.resetFields();
        } else {
            dispatch(AddSub(values.Email))
            form.resetFields();
        }

    }

    useEffect(() => {
        //console.log(emailsCancelled[0].email)
        //console.log(emailsCancelledMap)
        dispatch(GetSub())
    }, [dispatch])



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

