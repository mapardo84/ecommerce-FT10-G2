import { promises } from "dns";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { supabase } from "../../SupaBase/conection";

export const GET_USER_BOOKINGS = "GET_USER_BOOKINGS";
export const SET_LOADING = "SET_LOADING";

export const getUserBookings = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));

    const user: any = supabase.auth.user();

    if (user?.aud === "authenticated") {
      let userEmail: any = await supabase
        .from("users")
        .select("uuid , id")
        .eq("email", user.email)
        .limit(1)
        .single();
      /* console.log("email",userEmail) */

      /*  let paxes: any = await supabase
                .from('paxes')
                .select('id')
                .eq("uuid", userEmail.data[0].uuid)

            let paxBookingsId: any = await supabase
                .from('booking_pax')
                .select('booking_id')
                .eq("pax_id", paxes.data[0]?.id) */

      let userBookings: any = [];

      /* if (paxBookingsId.data !== null) {

                const bx: any = paxBookingsId.data.map((booking: any) => {

                    return ( */
      var bookings: any = await supabase
        .from("bookings")
        .select(
          "*, payments(totalPrice, payment_method), room_id(name, category_id(name, price), type_id(name, beds))"
        )
        .eq("user_id", userEmail.data.id);
      /* console.log("bookings", bookings) */

      /*   )
                }) */

      /*  Promise.all(bx).then((r: any) => {
       */
      try {
        bookings.data.forEach(
          (bookings: any) => {
            let checkinDate: any;

            if (bookings?.checkin) {
              checkinDate = new Date(bookings?.checkin?.replaceAll("-", ","));
            }

            let resta = checkinDate - Date.now();
            resta = Math.round(resta / (1000 * 60 * 60 * 24));

            /* if (bookings.status) { */
            const bookingDetails = {
              status: bookings?.status,
              bookingId: bookings?.id,
              checkin: bookings?.checkin,
              checkout: bookings?.checkout,
              roomNumber: bookings?.room_id.name,
              category: bookings?.room_id.category_id.name,
              type: bookings?.room_id.type_id.name,
              totalPrice: bookings?.payments[0]?.totalPrice,
              paymentMethod: bookings?.payments[0]?.payment_method,
              paxes: bookings?.paxes_amount,
              actual: false,
              moneyBack: resta + 1 > 7 ? true : false,
              userId: userEmail?.id,
            };
            userBookings.push(bookingDetails);
          }
          /* } */
        );
        dispatch(saveUserBookings(userBookings));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
      }

      /*  }
                ) */
    } else {
      dispatch(setLoading(false));
    }
  };
};

const saveUserBookings = (params: any) => {
  return {
    type: GET_USER_BOOKINGS,
    payload: params,
  };
};

export const setLoading = (params: any) => {
  return {
    type: SET_LOADING,
    payload: params,
  };
};

export const cancelUserBooking = (
  bookingId: number,
  price: number,
  userId: number,
  moneyBack: boolean
) => {
  return async (dispatch: Dispatch<any>) => {
    await supabase
      .from("bookings")
      .update({ status: false })
      .eq("id", bookingId);
    dispatch(getUserBookings());

    if (moneyBack) {
      let positiveBalance: any = await supabase
        .from("users")
        .select("positive_balance")
        .eq("id", userId);
      await supabase
        .from("users")
        .update({
          positive_balance: positiveBalance.data[0].positive_balance + price,
        })
        .eq("id", userId);
    }
  };
};
