import { PaxValues } from "../../components/booking/paxForm/PaxForm";
import { supabase } from "../../SupaBase/conection";


export const sendPax = async (value: PaxValues) => {
    const { uuid, first_name, last_name, phone, country, birth_date, address } = value;
    const { data, error } = await supabase.from('paxes').insert([
        {
            uuid,
            first_name,
            last_name,
            phone,
            country: country[0],
            birth_date: birth_date,
            address,
            titular: true,                              // esto no sirve si es admin 
        }
    ])
}

