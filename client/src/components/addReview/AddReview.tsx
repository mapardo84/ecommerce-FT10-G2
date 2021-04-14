import { ReactElement } from 'react'
import { Form, Input, Button } from 'antd';
import { addReview } from './../../actions/addReview/index';


interface IaddReviewForm {

}


export default function AddReview({ categId, userId }: any): ReactElement {

    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 8 }

    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    }

    const onFinish = (values: any) => {
        addReview(values.accomodationreview,categId,userId)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div>
            <Form
                {...layout}
                name='basic'
                initialValues={{ remember: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label='Accomodation Review'
                    name='accomodationreview'
                    rules={[{ required: true, message: 'Review empty' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Post Review
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
