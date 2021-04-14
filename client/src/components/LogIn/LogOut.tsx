import { logOut } from '../../helpers/logOut'


export const LogOut = () => {

    const handleClick=()=>{
        logOut()
    }

    return (
        <button onClick={handleClick} >LOG OUT</button>
    )
}


