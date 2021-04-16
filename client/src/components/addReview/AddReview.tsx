import { ReactElement,useState } from 'react'
import { Form, Input, Button,Rate } from 'antd';
import { addReview } from './../../actions/addReview/index';
import { supabase } from '../../SupaBase/conection';
import './AddReview.less';


interface IaddReviewForm {

}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const session = supabase.auth.session();
   
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 }
    }

    const tailLayout = {
        wrapperCol: { offset: 10, span: 1 },
        labelCol: { span: 6 }
    }
    
export default function AddReview({ categId, userId }: any): ReactElement {

    const [rate,setRate] = useState<number>(3)


    const handleChangeRate = (rateValue:number)=>{
        setRate(rateValue);
    }

    const onFinish = (values: {accomodationreview:string}) => {
        addReview(values.accomodationreview,categId,userId,rate)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div>
            { session?.user.email &&
            <Form         
                {...layout}
                size='large'
                name='basic'
                initialValues={{ remember: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
             
                <Form.Item 
                    label='Add Review'
                    name='accomodationreview'
                    rules={[{ required: true, message: 'Review empty' }]}
                >
                    <Input.TextArea />
                    </Form.Item>
                <span className='addReviewRate'>
                <Rate tooltips={desc} onChange={handleChangeRate} 
                   value={rate} />
                   {rate ? <span className='ant-rate-text'> {desc[rate - 1]}</span> : ''}
                </span>
                
                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit' size='large'>
                        Post Review
                </Button>
                </Form.Item>
            </Form>
            }
        </div>
    )
}
