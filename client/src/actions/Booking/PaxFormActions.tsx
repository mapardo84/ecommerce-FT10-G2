import { PaxValues } from "../../components/booking/paxForm/PaxForm";
import { supabase } from "../../SupaBase/conection";

export const sendPax = async (value: PaxValues) => {
    const { uuid, first_name, last_name, phone, country, birth_date, address } = value;
    const { data } = await supabase.from('paxes').insert([
        {
            uuid,
            first_name,
            last_name,
            phone,
            country: country[0],
            birth_date: birth_date,
            address,                            // esto no sirve si es admin 
        }
    ])
    console.log(`Se ha guardado el pax ${data}`);
}


