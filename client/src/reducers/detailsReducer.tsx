
const initialState = {
    name: '',
    capacity: 0,
    description: '',
    details: [],
    price: 0,
    images: []
}

export default function detailsReducer (state = initialState, action:{ type:string, payload: { name:string, capacity:number, description:string, details:any, price:number, images:any }}) {
    switch( action.type ) {
        // case :
        default: 
            return state;
    }
}