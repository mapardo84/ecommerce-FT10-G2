import { bookingType } from '../guestsForm/GuestsForm';
import { roomType } from './AccomodationsSelect';

const filteredCategories = ( rooms:roomType[], booking:bookingType, categories:any, allBookings:any ) => {
    const totalPaxes = booking.guests
    const filteredRooms:roomType[] = rooms.filter( (e:roomType) => e.beds >= totalPaxes );
    const catRooms:number[] = [];
    
    filteredRooms.forEach( (room:roomType) => catRooms.push(room.category_id) );
    const catUnique = catRooms.filter( (value, index, self) => {
        return self.indexOf(value) === index;
    });

    let resul:roomType[] = [];
    categories.categories.forEach( (cat:roomType) => {
        if (catUnique.includes(cat.id)) resul.push(cat);
    });


    //Aquí el filtrado por fechas
    let bookedCategories:any = []
    // Recorres ambos arreglos y aplicas la condición que deseas
    rooms.filter((d:any) => {
        allBookings.filter((s:any) => {
            if (d.id === s.room_id) {
                bookedCategories.push(d)
            }
        })
    })

    console.log(bookedCategories)

    


    return resul;
}

export default filteredCategories;