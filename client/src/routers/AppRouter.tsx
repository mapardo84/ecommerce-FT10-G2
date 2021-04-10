import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import Accomodations from "../components/accomodations/Accomodations";
import { Home } from '../components/home/Home';

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
                        component={Home}
                    />
                    <Route 
                        exact path='/home/accomodations'
                        component={Accomodations}
                    />
                    <Redirect to="/" />

                </Switch>

            </div>
        </Router>
    )
}
