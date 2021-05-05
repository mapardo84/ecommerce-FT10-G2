import { useState } from 'react'
import { Form, Input, Button, Divider } from 'antd'
import { getUserProfile, updateUserProfile } from '../../actions/userProfile/userProfileActions'
import { useDispatch } from 'react-redux'

const { Item } = Form


export const UpdateRegister = () => {
    const dispatch = useDispatch()
    const [send, setSend] = useState<boolean>(false)

    const validator = (string?: any) => {
        for (var i = 0; i < 10; i++) {
            if (string.includes(i)) {
                return true
            }
        }
        return false
    }

    const onChange = async (_: any, allValues: any) => {
        let updateInfo: any = {
            first_name: "",
            last_name: "",
            uuid: ""
        }
        allValues.forEach((e: any) => updateInfo[e.name] = e.value)
        for (let i in updateInfo) {
            if (i !== "uuid") {
                if (updateInfo[i]) {
                    if (validator(updateInfo[i])) {
                        return setSend(false)
                    }
                } else {
                    return setSend(false)
                }
            } else {

                if (updateInfo[i]) {
                    if (updateInfo[i].length < 6 || updateInfo[i].length > 24) {
                        setSend(false)
                    } else {
                        setSend(true)
                    }
                }
            }
        }
    }

    const onFinish = (values: any) => {
        dispatch(updateUserProfile(values))
        dispatch(getUserProfile())
    }

    return (
        <>
            <Divider>Update some info</Divider>
            <Form name="basic" initialValues={{ remember: true }} onFieldsChange={onChange} onFinish={onFinish}>
                <Item
                    name="first_name"
                    rules={[{ required: true, message: "Please, put your first name!" },
                    {
                        validator: async (_, firstName) => {
                            if (validator(firstName)) {
                                return Promise.reject(new Error("Words please"));
                            }
                        },
                    }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Input placeholder="First Name"></Input>
                </Item>

                <Item
                    name="last_name"
                    rules={[{ required: true, message: "Please, put your first name!" },
                    {
                        validator: async (_, firstName) => {
                            if (validator(firstName)) {
                                return Promise.reject(new Error("Words please"));
                            }
                        },
                    }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Input placeholder="Last Name"></Input>
                </Item>

                <Item
                    name="uuid"
                    rules={[{ required: true, message: "Please, put your first name!" }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Input placeholder="Dni/Identity"></Input>
                </Item>
                {send ? <Button style={{ marginBottom: "7px" }} type="primary" htmlType="submit" >
                    Sign Up
                </Button> : null}
            </Form>
        </>
    )
}
