import { ReactElement, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import { AddSub, GetSub, UpdateSub } from '../../../actions/addNewsletterSub/index';
import { useDispatch, useSelector } from 'react-redux';
import "./HomeNewsletter.less"


export function HomeNewsletter(): ReactElement {
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
        dispatch(GetSub())
    }, [dispatch])



    return (
        <div className="newsLetterContainer">
            <div className="newsLetterTitle">SUBSCRIBE TO OUR NEWSLETTER</div>
            <div className="newsLetterDescription">to receive our latest news and discounts, subscribe to our newsletter</div>

            <Form className="newsLetterForm" form={form} autoComplete='off' onFinish={onFinish}>
                <Form.Item
                    className="newsLetterInput"
                    name='Email'
                    rules={[
                        { required: true, message: "Please insert your e-mail!" },
                        { type: "email", message: "The input is not valid e-mail!" },
                    ]}
                >
                    <Input placeholder='Enter your email...'></Input>
                </Form.Item>
                <Button style={{ zIndex: 0 }} type='primary' htmlType='submit'>
                    Subscribe
                </Button>
            </Form>
        </div>
    )
}

