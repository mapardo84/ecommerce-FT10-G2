import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function SuccessPayment() {

    let obj2={}
    const query= window.location.search
    const array=query.split("&").map(e=>e.split("="))
        useEffect(() => {
            console.log(localStorage.getItem("Henry"))
        }, [])
    
    return (
        <>
        {array?array.map((e:any)=>{
            return(
            <div>
                {JSON.stringify({e})}
            </div>)
        }):null}
        <Link to="/home">
            <Button onClick={()=>localStorage.removeItem("Henry")}>GO HOME</Button>
        </Link>
        </>
        
    )
    }
