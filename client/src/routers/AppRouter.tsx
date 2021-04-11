import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import Accomodations from "../components/accomodations/Accomodations";
import { StepsBooking } from "../components/booking/StepsBooking";
import { Home } from '../components/home/Home';
import { BookingLayout } from "../components/layout/BookingLayout";
import { HomeLayout } from "../components/layout/HomeLayout";
import { Register } from "../components/LogIn/Register";


//ACA VAN TODAS LAS RUTAS



export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact path="/"
                        component={Home}
                    />
                    <Route
                        exact path="/home"
                        component={HomeLayout}
                    />
                    <Route 
                        exact path='/home/accomodations'
                        component={Accomodations}
                    />
                    <Route
                        exact path="/form"
                        component={Register}
                    />
                    <Route
                        exact path="/booking"
                        component={BookingLayout}
                    />
    
                    <Redirect to="/" />


                </Switch>

            </div>
        </Router>
    )
}
