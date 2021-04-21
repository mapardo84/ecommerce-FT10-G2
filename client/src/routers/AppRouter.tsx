import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { HomeLayout } from "../components/layout/HomeLayout";
import { LandingPage } from "../components/Landing Page/LandingPage";
import { Register } from "../components/LogIn/Register";
import { LogIn } from "../components/LogIn/LogIn";
import { FaqLayout } from "../components/layout/FaqLayout";
import { BookingLayout } from "../components/layout/BookingLayout";
import { AccomodationLayout } from "./../components/layout/AccomodationLayout";
import { AccomodationDetailsLayout } from "../components/layout/AccomodationsDetailsLayout";
import { Plantilla } from "../Admin/Plantilla";
import { RoomsLayout } from "../Admin/components/RoomsLayout";
import { CategoriesLayout } from "../Admin/components/CategoriesLayout";
import { TypesLayout } from "../Admin/components/TypesLayout";
import { UsersLayout } from "../Admin/components/UsersLayout";
import ResetPasswordLayout from "../components/layout/ResetPasswordLayout";
import { MyBookingsLayout } from "../components/layout/MyBookingsLayout";
import BookingCard from "../components/myBookings/BookingCard";
import BokingDetails from "../components/myBookings/BookingDetails";

//ACA VAN TODAS LAS RUTAS

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomeLayout} />
          <Route exact path="/form" component={Register} />
          <Route exact path="/logIn" component={LogIn} />
          <Route exact path="/booking" component={BookingLayout} />
          <Route exact path="/faq" component={FaqLayout} />
          <Route exact path="/myBookings" component={MyBookingsLayout} />

          {/* Parte administrativa */}
          <Route exact path="/admin" component={Plantilla} />
          <Route exact path="/admin/rooms" component={RoomsLayout} />
          <Route exact path="/admin/categories" component={CategoriesLayout} />
          <Route exact path="/admin/types" component={TypesLayout} />
          <Route exact path="/admin/users" component={UsersLayout} />
          {/* Parte administrativa */}

          <Route exact path="/accomodations" component={AccomodationLayout} />
          <Route
            exact
            path="/accomodations/:id"
            component={AccomodationDetailsLayout}
          />
          <Route exact path="/password-reset/:token" component={ResetPasswordLayout} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
