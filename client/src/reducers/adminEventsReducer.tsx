import { GET_BOOKED_EVENTS, GET_ALL_HALLS, GET_ALL_REQUESTS, UPDATE_HALL, DELETE_HALL, UPDATE_EVENT, UPDATE_REQUEST, DELETE_REQUEST, DELETE_EVENT } from '../Admin/actions/adminEventsActions';
import { IHalls } from '../Admin/components/Events/Halls';
import { IBookedEvents } from '../Admin/components/Events/HallsBookings';
import { IRequests } from '../Admin/components/Events/HallsRequests';

const initialState = {
    requests: [],
    bookings: [],
    halls: []
}

export const adminEventsReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ALL_HALLS: 
            return { ...state, halls: action.payload };
        case GET_BOOKED_EVENTS:
            return { ...state, bookings: action.payload };
        case GET_ALL_REQUESTS:
            return { ...state, requests: action.payload };
        case UPDATE_HALL:
            return { ...state, halls: state.halls.map((h:IHalls) => {
                if (h.id === action.payload.id) {
                    return action.payload;
                }
                return h;
            })
        };
        case DELETE_HALL:
            return { ...state,
                halls: state.halls.filter((h:IHalls) => h.id !== action.payload)
            };
        case UPDATE_EVENT:
            return { ...state, bookings: state.bookings.map((b:IBookedEvents, i:number) => {
                if (b.id === action.payload.id) {
                    return action.payload;
                }
                return b;
            })
        };
        case DELETE_EVENT:
            return { ...state,
                bookings: state.bookings.filter((e:IBookedEvents) => e.id !== action.payload)
            };
        case UPDATE_REQUEST:
            return { ...state, requests: state.requests.map((r:IRequests, i:number) => {
                if (r.id === action.payload.id) {
                    return action.payload;
                }
                return r;
            })
        };
        case DELETE_REQUEST:
            return { ...state,
                requests: state.requests.filter((r:IRequests) => r.id !== action.payload)
            };
        default: 
            return state;
    }
}