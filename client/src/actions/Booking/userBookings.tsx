import { Dispatch } from "redux";
import { UserBooking } from "../../reducers/userBookingsReducer";
import { supabase } from "../../SupaBase/conection";

export const GET_USER_BOOKINGS = "GET_USER_BOOKINGS";
export const SET_LOADING = "SET_LOADING";

export const getUserBookings = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));

    const user = supabase.auth.user();

    if (user?.aud === "authenticated") {
      let userEmail = await supabase
        .from("users")
        .select("uuid , id")
        .eq("email", user.email)
        .limit(1)
        .single();

      let userBookings: UserBooking[] = [];
      
      var bookings = await supabase
        .from("bookings")
        .select(
          "*, payments(totalPrice, payment_method), room_id(name, category_id(name, price), type_id(name, beds))"
        )
        .eq("user_id", userEmail.data.id);
      if (!bookings.data) {
        return;
      }
      try {
        bookings.data.forEach((bookings: any) => {
          let checkinDate: any = new Date();

          if (bookings?.checkin) {
            checkinDate = new Date(bookings?.checkin?.replaceAll("-", ","));
          }

          let resta = checkinDate - Date.now();
          resta = Math.round(resta / (1000 * 60 * 60 * 24));

          const bookingDetails = {
            bookingStatus: bookings?.status,
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
            userId: userEmail?.data.id,
          };

          userBookings.push(bookingDetails);
        });
        dispatch(saveUserBookings(userBookings));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(setLoading(false));
    }
  };
};

const saveUserBookings = (params: UserBooking[]) => {
  return {
    type: GET_USER_BOOKINGS,
    payload: params,
  };
};

export const setLoading = (params: boolean) => {
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
      try {
        let positiveBalance = await supabase
          .from("users")
          .select("positive_balance")
          .eq("id", userId);
        if (positiveBalance.data) {
          const balancePositivo: number =
            positiveBalance?.data[0]?.positive_balance + price;
          await supabase
            .from("users")
            .update({
              positive_balance: balancePositivo,
            })
            .eq("id", userId);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
};
