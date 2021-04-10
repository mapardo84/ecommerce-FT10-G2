import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import { Home } from '../components/home/Home';
import { LandingPage } from "../components/Landing Page/LandingPage";
import {Register} from "../components/LogIn/Register";
import {LogIn} from "../components/LogIn/LogIn";
import {LogOut} from "../components/LogIn/LogOut";
import {Rodrigo} from "../components/LogIn/Rodrigo";

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
                        component={Home}
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
                        component={Rodrigo}/>

                    <Redirect to="/" />

                </Switch>

            </div>
        </Router>
    )
}
