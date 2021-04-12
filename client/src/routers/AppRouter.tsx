import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
<<<<<<< HEAD
import Accomodations from "../components/accomodations/Accomodations";
import Details from "../components/categories/Details/Details";
=======
>>>>>>> PateFunkyV2
import { Home } from '../components/home/Home';
import { HomeLayout } from "../components/layout/HomeLayout";
import { LandingPage } from "../components/Landing Page/LandingPage";
import {Register} from "../components/LogIn/Register";
import {LogIn} from "../components/LogIn/LogIn";
import {LogOut} from "../components/LogIn/LogOut";
import {Rodrigo} from "../components/LogIn/Rodrigo";
import {AccomodationLayout} from './../components/layout/AccomodationLayout';

//ACA VAN TODAS LAS RUTAS


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact path="/"
                        component={LandingPage}
                    />
                    <Route
                        exact path="/home"
                        component={HomeLayout}
                    />
                    <Route 
                        exact path='/home/accomodations'
                        component={AccomodationLayout}
                    />
                    <Route 
                        exact path='/home/accomodations/:id'
                        component={Details}
                    />
                    <Route
                        exact path="/form"
                        component={Register}
                    />
                    <Route
                        exact path="/logIn"
                        component={LogIn}
                    />
                     <Route
                        exact path="/logOut"
                        component={LogOut}
                    />
                     <Route
                        exact path="/rodrigo"
                        component={Rodrigo}                    
                    />

                    <Redirect to="/" />

                </Switch>

            </div>
        </Router>
    )
}
