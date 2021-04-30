import { ReactElement } from 'react'
import { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Input, Tooltip, Popconfirm, Select, Space, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNewsletter, post_newsletter, IEmail } from '../../actions/newsletterActions';


interface Props {

}

export function NewsLetter({ }: Props): ReactElement {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const {newsletters} = useSelector((state:any)=>state?.newsletters)
    
    const columns: any = [
        {
            title: 'Title',
            dataIndex: 'email_title',
            key: 'id'
        }, {
            title: 'Content',
            dataIndex: 'email_content',
            key: 'id'
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'id'
        }
    ]

    const closeModal = () => {
        form.resetFields();
        setIsModalVisible(false)
    }

    const onFinish = (values:IEmail) =>{
        dispatch(post_newsletter(values))
        form.resetFields();
        setIsModalVisible(false)
    }

    useEffect(()=>{
        dispatch(getAllNewsletter())
    },[dispatch])



    return (
        <div>
            <div>
                <Button
                    type='primary'
                    onClick={() => setIsModalVisible(true)}
                    className='types_upbar'
                >
                    Send Newsletter
                </Button>
            </div>
            <div className="types_upbar">
            </div>
            <Table
                dataSource={newsletters}
                columns={columns}
                pagination={{ position: ['bottomCenter'] }}
                rowKey="id"
            />
            <Modal title="Send Newsletter" visible={isModalVisible} onCancel={closeModal} footer={null} >
               <Form form={form} autoComplete='off' onFinish={onFinish}>
                <Form.Item
                    label="Title"
                    name="email_title"
                >
                    <Input placeholder="Title"></Input>
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="email_content"
                >
                    <TextArea placeholder="Content"></TextArea>
                </Form.Item>
                <Form.Item
                        label="Image URL"
                        name="email_image"
                    >
                        <Input placeholder="Image URL"></Input>
                    </Form.Item>

                <div className="users_btn">
                    <Button onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </div>
                </Form>
            </Modal>


        </div>
    )
}
