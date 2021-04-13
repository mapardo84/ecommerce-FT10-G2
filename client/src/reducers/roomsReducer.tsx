import {GET_ALL_ROOMS} from '../actions/roomsActions'
import { Room } from '../components/Admin/components/RoomsTable/RoomsTable'

const InitialState={
    roomsList:[]
}

export function roomsReducer(state=InitialState,action:{type:string,payload:Room[]}){
    switch(action.type){
        case GET_ALL_ROOMS:
        return{
            ...state,
            roomsList:action.payload
        }    
        default:
            return state
    }
}