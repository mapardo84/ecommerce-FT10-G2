import {BYPAXID, BYBOOKINGID, BYFIRSTNAME, BYLASTNAME} from '../Admin/actions/searchBarActions'



const initialState={
    bypaxID:[],
    bybookingID: [],
    byFirstName: [],
    byLastName: [],
}

export const searchBookingReducer=(state:any=initialState,action:{type:string,payload:any})=>{
    switch(action.type){
        case BYPAXID:
            return{
                ...state,
                bypaxID:action.payload
            }
        case BYBOOKINGID:
            return{
                ...state,
                bybookingID:action.payload
            }
        case BYFIRSTNAME:
            return{
                ...state,
                byFirstName:action.payload
            }
        case BYLASTNAME:
            return{
                ...state,
                byLastName:action.payload
            }
        default:
            return state
    }
}