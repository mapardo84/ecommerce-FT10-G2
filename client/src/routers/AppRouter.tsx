import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import Accomodations from "../components/accomodations/Accomodations";
import { Home } from '../components/home/Home';
import { HomeLayout } from "../components/layout/HomeLayout";
import {LogIn} from "../components/LogIn/LogIn";
import {LogOut} from "../components/LogIn/LogOut";
import { Register } from "../components/LogIn/Register";
import { Rodrigo } from "../components/LogIn/Rodrigo";


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
