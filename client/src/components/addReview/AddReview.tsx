import { ReactElement, useState } from 'react'
import { Form, Input, Button, Rate } from 'antd';
import { addReview } from './../../actions/addReview/index';
import { supabase } from '../../SupaBase/conection';
import './AddReview.less';
import { useDispatch } from 'react-redux';



const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
const session = supabase.auth.session();


export default function AddReview({ categId, userId, veri }: any): ReactElement {

    const [form] = Form.useForm();
    const [rate, setRate] = useState<number>(3)
    const dispatch = useDispatch();

    const handleChangeRate = (rateValue: number) => {
        setRate(rateValue);
    }

    const onFinish = (values: { accomodationreview: string }) => {
        dispatch(addReview(values.accomodationreview, categId, userId, rate));
        form.resetFields();
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const sharedProps = {
        placeholder: "Write a review...",
    };

    return (

        <div>
            { session?.user.email && veri &&

                <Form
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    className="formAddReview"
                >

                    <Form.Item
                        name='accomodationreview'
                        rules={[{ required: true, message: 'Review empty' }]}
                    >
                        <Input.TextArea className="textAreaReview" {...sharedProps} />
                    </Form.Item>

                    <div className="addReviewRow">
                        <div className="addRateReview">
                            <span className='addReviewRate'>
                                <Rate defaultValue={5} tooltips={desc} onChange={handleChangeRate}
                                    value={rate} />
                                {/* {rate ? <span className='ant-rate-text'> {desc[rate - 1]}</span> : ''} */}
                            </span>
                        </div>

                        <Form.Item>

                            <Button type='primary' htmlType='submit' size='large' >
                                Post Review
                        </Button>
                        </Form.Item>
                    </div>

                </Form>
            }
        </div>
    )
}
