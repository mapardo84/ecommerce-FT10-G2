
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import { Home } from '../components/Home/Home';
import { LayoutTemplate } from "../components/Layout/Layout";
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
