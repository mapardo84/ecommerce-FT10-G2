import { supabase } from '../../SupaBase/conection';


// var bookings: any = await supabase
//         .from("bookings")
//         .select(
//           "*, payments(totalPrice, payment_method), room_id(name, category_id(name, price), type_id(name, beds))"
//         )
//         .eq("user_id", userEmail.data.id);

export const getNotifications = (userId:number) =>{
   

    const userWishlist = async ()=>{
        console.log("??????????????????????")
        let infoNotification =  await supabase
        .from('wishlist')
        .select('category_id')
        .eq("user_id", userId)
            await supabase
            .from('discounts')
           .select('categoryToApply')
           .eq("categoryToApply", "category_id")
       }
    }

   
