import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'

export const WishList=()=>{
    const [addInList, setAddInList] = useState<boolean>(false)
    return (
        <>
        <Button
        onClick={()=>setAddInList(true)}
        >DALE</Button>
        <Modal
        visible={addInList}
        onCancel={()=>setAddInList(false)}
        footer={null}>
        </Modal>                        
        </>
    )
}
