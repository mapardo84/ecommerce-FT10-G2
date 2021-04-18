import { categoryType, roomType } from '../../components/booking/accomodationsSelect/AccomodationsSelect';
import { bookingType } from '../../components/booking/guestsForm/GuestsForm';
import { supabase } from '../../SupaBase/conection';
export const STEP_CHANGE = 'STEP_CHANGE';
export const SET_BOOK_DATA = 'SET_BOOK_DATA'
export const GET_SOME_BOOKINGS="GET_SOME_BOOKINGS";
export const CATEGORIES_TO_SHOW="CATEGORIES_TO_SHOW";
export const FILTER_DATES ="FILTER_DATES";
export const FREE_ROOMS_SHOW= "FREE_ROOMS_SHOW"
export const SET_CATEGORY = "SET_CATEGORY";
export const SELECTED_CATEGORY_ROOMS = "SELECTED_CATEGORY_ROOMS"
export interface bookAction {
    type: string,
    payload: any
}

export const stepChange = (inputs:number) => {
    return {
        type: STEP_CHANGE,
        payload: inputs
    }
}

export const setBookData = (booking:bookingType) => {
    return {
        type: SET_BOOK_DATA,
        payload: { booking }
    }
}

export const setCategory = (input:any) =>{
    return{
        type: SET_CATEGORY,
        payload: input
    }
}

export const getAvailableCategories = (rooms:any)=>{
    return async ( dispatch:any ) => {
        let result:any=[]
        let categoriesFiltered:any=[]
        if( rooms && rooms.length ){
            for(let i=0; i< rooms.length; i++){
                for(let j=0; j< rooms[i].length; j++){
                    if(!categoriesFiltered.includes(rooms[i][j].category_id)){
                          let { data: categories } = await supabase
                            .from('categories')
                            .select('*')
                            .eq("id",rooms[i][j].category_id);
                            result.push(categories?.pop()); 
                            categoriesFiltered.push(rooms[i][j].category_id)
                    }
                }
            }
        }
        dispatch(categoriesToShow(result));
    }
}

// ACTION EJECUTADA POR EL BOTON NEXT DEL COMPONENTE GUEST FORM
export const getCategoriesForUser = (userBooking:bookingType) => {
    return async ( dispatch:any ) => {
        const { guests, range } = userBooking;
        const [ checkin, checkout ] = range;
        
        //Traer los Types que cumple con el criterio de guests
        const { data: types } = await supabase
        .from("types")
        .select("*")
        .gte("capacity",guests);
        console.log(types);
        
        //Traer los Rooms que pertencen a los types recibidos en el paso anterior
        const rooms:any = [];
        if( types?.length ) {
            for ( let i = 0; i < types.length; i++ ) {
                const { data: room } = await supabase
                .from("rooms")
                .select('*')
                .eq("type_id",types[i].id);
                rooms.push(room);
            }
        }

        //Trae los Rooms que están disponibles en las fechas dadas por el usuario
        let freeRooms:roomType[] = [];
        for (let i:number = 0; i < rooms.length; i ++) {
            for (let j:number = 0; j < rooms[i].length; j ++) {
                let { data: bookingRoom } = await supabase
                .from('bookings')
                .select('*')
                .eq("room_id", rooms[i][j].id);
                if ( !bookingRoom?.length ) freeRooms.push(rooms[i][j]);
                else {
                    if ( bookingRoom[0].checkout <= checkin ) {
                        freeRooms.push(rooms[i][j]);
                    }
                    else if ( bookingRoom[0].checkin >= checkout ) {
                        freeRooms.push(rooms[i][j]);
                    }
                    else if ( bookingRoom[0].checkin < checkin && bookingRoom[0].checkout > checkin ) {
                        console.log('se descarta');
                    }
                    else if ( bookingRoom[0].checkin >= checkin && bookingRoom[0].checkout <= checkout ) {
                        console.log('se descarta');
                    }
                    else if ( bookingRoom[0].checkin <= checkout && bookingRoom[0].checkout >= checkout ) {
                        console.log('se descarta');
                    }
                }
            }
        }

        //Seleccionar categorias correspondientes a los rooms libres
        let result:any=[]
        for(let i = 0; i < freeRooms.length; i++){
            if(!result.some( (x:categoryType) => x.id === freeRooms[i].category_id )){
                let { data: categories } = await supabase
                .from('categories')
                .select('*')
                .eq("id",freeRooms[i].category_id);
                result.push(categories?.pop());
            }
        }
        dispatch(categoriesToShow({ userCategories: result, types: types }));
        dispatch(freeRoomsToShow(freeRooms));
    }
// user                     checkin                   checkout
// room      ckin   ckout
// room             ckin               ckout
// room                         ckin            ckout
// room                                ckin                    ckout
// room                                                 ckin            ckout
}

const categoriesToShow = (payload:any)=>{
    return{
        type: CATEGORIES_TO_SHOW,
        payload
    }
}

const freeRoomsToShow = (payload:any) =>{
    return{
        type: FREE_ROOMS_SHOW,
        payload
    }
} 

export const finalFilterForRooms = (categoryPax:any, freeRooms:any)=>{
    return  ( dispatch:any ) =>{
        let roomsAvailable= []
        for(let i=0; i< freeRooms.length; i++){
            if(categoryPax[1] === freeRooms[i].id){
                roomsAvailable.push(freeRooms[i])
            }

        }
        dispatch(selectedCategoryRooms(roomsAvailable))
    }
}
    
const selectedCategoryRooms = (payload:any) =>{
    return{
        type: SELECTED_CATEGORY_ROOMS,
        payload
    }
}