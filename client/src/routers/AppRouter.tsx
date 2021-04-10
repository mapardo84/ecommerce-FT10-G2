
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import { LayoutTemplate } from "../components/Layout/Layout";
import {Rodrigo} from '../components/LogIn/Rodrigo'
import { LandingPage } from "../components/Landing Page/LandingPage";

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
                        component={LayoutTemplate}
                    />
                    <Route
                        exact path="/logIn"
                        component={Rodrigo}
                    />

                    <Redirect to="/" />

                </Switch>

            </div>
        </Router>
    )
}
