
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import { LandingPage } from "../components/Landing Page/LandingPage";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { RoomsLayout } from "../Admin/components/Layout/RoomsLayout/RoomsLayout";

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
                        path="/admin/rooms"
                        component={RoomsLayout}
                    />
                    <Route
                        exact path="/admin_users"
                    />
                    <Route
                        exact path="/admin_bookings"
                    />

                

                    <Redirect to="/" />
                </Switch>

            </div>
        </Router>
    )
}
