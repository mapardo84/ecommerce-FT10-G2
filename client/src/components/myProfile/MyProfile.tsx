import { Button, Divider, message, } from 'antd';
import { WalletOutlined, UserOutlined, CalendarOutlined, PicLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../actions/userProfile/userProfileActions';
import "./MyProfile.less"
import { supabase } from '../../SupaBase/conection';
import { useHistory } from 'react-router-dom';


const MyProfile = () => {

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getUserProfile())
    }, [])


    const userProfile = useSelector((state: any) => state.userProfile.data);
    console.log("userProfile", userProfile)

    const handlePassword = async () => {
        supabase.auth.api.resetPasswordForEmail(userProfile.email)
        message.success("The instructions to reset your password have been sent to your email, please check it.", 5);
    };

    return (
        <div className="myProfileContainer">

            <div className="myProfileDiv1">
                <div className="myProfileTitles">PERSONAL DATA <PicLeftOutlined style={{ marginLeft: "10px" }} /></div>
                <div className="myProfileInfo">
                    <div className="myProfileRow" ><div className="myProfileSubTitles">First Name: </div >{userProfile.first_name}</div>
                    <div className="myProfileRow" ><div className="myProfileSubTitles">Last Name: </div>{userProfile.last_name}</div>
                    <div className="myProfileRow" ><div className="myProfileSubTitles">ID: </div>{userProfile.uuid}</div>
                    <div className="myProfileRow" ><div className="myProfileSubTitles">Email: </div><div className="emailResponsive">{userProfile.email}</div></div>
                    <Button onClick={handlePassword} style={{ width: "200px" }} type="primary">RESET PASSWORD</Button>
                </div>
                {/* <div className="dividerProfile"><Divider></Divider></div> */}

            </div>
            <div className="myProfileDiv2">
                <div className="myProfileTitles">MY BALANCE <WalletOutlined style={{ marginLeft: "10px" }} /></div>
                <div className="myProfileRow" ><div className="myProfileSubTitles">USD: </div>${userProfile.positive_balance}</div>
                <div className="myProfileText">This will be used in your next booking</div>
            </div>

            <div className="myProfileDiv3">
                <div className="myProfileTitles">MY BOOKINGS<CalendarOutlined style={{ marginLeft: "10px" }} /></div>
                <Button onClick={() => history.push("/myBookings")} type="primary">BOOKINGS</Button>
                <div className="myProfileText">Get details of your bookings</div>
            </div>

        </div>
    )
}

export default MyProfile
