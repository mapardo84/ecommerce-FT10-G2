import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Room } from './Checkin';
import { CheckinAvailable } from './CheckinAvailable';

export const CheckinRoom = ({ steps }: { steps: Function }): JSX.Element => {

    const [roomSelected, setRoomSelected] = useState<Room>()

    const { roomsList } = useSelector((state: any) => state?.rooms)
    const { roomId } = useSelector((state: any) => state?.checkin)

    useEffect(() => {
        setRoomSelected(roomsList.find((room: Room) => room.id === roomId))
    }, [roomsList, roomId])

    switch (roomSelected?.availability) {
        case 'available':
            return <CheckinAvailable steps={steps} />
        default:
            break;
    }

    return (
        <>
        </>
    )
}
