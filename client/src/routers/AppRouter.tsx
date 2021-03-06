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
import { WishlistLayout } from "../components/layout/WishlistLayout";
import ResetPasswordLayout from "../components/layout/ResetPasswordLayout";
import { MyBookingsLayout } from "../components/layout/MyBookingsLayout";
import { MyProfileLayout } from "../components/layout/MyProfileLayout";
import { CheckinLayout } from '../Admin/components/CheckinLayout';
import { PaxesLayout } from '../Admin/components/PaxesLayout';
import { BookingsLayout } from "../Admin/components/BookingsLayout";
import { DiscountsLayout } from "../Admin/components/DiscountsLayout"
import { SuccessLayout } from "../components/layout/SuccesLayout";
import { EventsLayout } from "../Admin/components/EventsLayout";
import { HallsRequestsLayout } from "../Admin/components/Events/HallsRequestsLayout";
import { HallsBookingsLayout } from "../Admin/components/Events/HallsBookingLayout";
import { HallsLayout } from "../Admin/components/Events/HallsLayout";
import { EventLayout } from "../components/layout/EventsLayout";
import { NewsLetterLayout } from '../Admin/components/NewsLetterLayout';
import { FormEventsLayout } from "../components/layout/formEventsLayout";
import { AboutUsLayout } from "../components/layout/AboutUsLayout";

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
          <Route exact path="/events" component={EventLayout} />
          <Route exact path="/events/quote" component={FormEventsLayout} />
          <Route exact path="/faq" component={FaqLayout} />
          <Route exact path="/myProfile" component={MyProfileLayout} />
          <Route exact path="/myBookings" component={MyBookingsLayout} />
          <Route exact path="/wishlist" component={WishlistLayout} />
          <Route exact path="/aboutUs" component={AboutUsLayout} />



          {/* Parte administrativa */}
          <Route exact path="/admin" component={Plantilla} />
          <Route exact path="/admin/rooms" component={RoomsLayout} />
          <Route exact path="/admin/categories" component={CategoriesLayout} />
          <Route exact path="/admin/types" component={TypesLayout} />
          <Route exact path="/admin/users" component={UsersLayout} />
          <Route exact path="/admin/checkin" component={CheckinLayout} />
          <Route exact path="/admin/paxes" component={PaxesLayout} />
          <Route exact path="/admin/bookings" component={BookingsLayout} />
          <Route exact path="/admin/discounts" component={DiscountsLayout} />
          <Route exact path="/admin/events" component={EventsLayout} />
          <Route exact path="/admin/events/requests" component={HallsRequestsLayout} />
          <Route exact path="/admin/events/bookings" component={HallsBookingsLayout} />
          <Route exact path="/admin/events/halls" component={HallsLayout} />

          {/* <Route exact path="/admin/events" component={EventsAdminLayout}/> */}
          <Route exact path="/admin/newsletter" component={NewsLetterLayout} />
          {/* Parte administrativa */}

          <Route exact path="/accomodations" component={AccomodationLayout} />
          <Route
            exact
            path="/accomodations/:id"
            component={AccomodationDetailsLayout}
          />
          <Route
            exact
            path="/booking/success"
            component={SuccessLayout}
          />
          <Route exact path="/password-reset/:token" component={ResetPasswordLayout} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
