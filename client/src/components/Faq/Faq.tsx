import "./faq.less";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const Faq = () => {
  return (
    <div className="section">
      <h1 className="title1">FREQUENTLY ASKED QUESTIONS</h1>
      <h2>All the answers you are looking for!</h2>
      <p>
        If you have any question in regards to our hotel, check out our most
        frequently asked questions below <br></br>and find the answers you
        need.If you dont find the question, don't hesitate to contact us.
      </p>
      <div className="title">
        GENERAL
      </div>
      <div className="okkk2">
      <Collapse className="ok" defaultActiveKey={[""]}>
        <Panel
        className="panel"
          header="Which advantages can I get if I book directly from the hotel web site?"
          key="1"
        >
          <p>
            If you book on our official website you are going to have the best
            price we can offer. You will also have a direct and personalized
            contact with the Hotel for you to have the best experience possible.
          </p>
        </Panel>
        <Panel header="When can I Check-In for the room ?" key="2">
          <p>
            Normally our rooms are available from 1.00 pm. For all our guest
            booking from this web site, we offer the possibility of an early
            check-in (except when the room is still occupied by the previous
            guest due to other requests). We also offer luggage storage service
            in the hotel at the arrival.
          </p>
        </Panel>
        <Panel
          header="Is there internet connection in the hotel areas?"
          key="3"
        >
          <p>
            We offer a Wi-Fi connection available for all the guests in each
            room and all the hotel’s areas.
          </p>
        </Panel>
        <Panel header="Are city taxes included in the price?" key="4">
          <p>
            No, the city tax is a municipal district fee which has to be paid
            upon arrival to the hotel, for the town of Rimini. The cost is $2,00
            per person, daily, for a maximum of 7 consecutive days. Children
            under 14 years old are free of charge.
          </p>
        </Panel>
        <Panel header="What if I want to cancel my reservation?" key="5">
          <p>
            In case you want to cancel, or make any changes to the reservation
            done up to 7 days before the expected date of check-in, you can do
            it free of an extra charge. If the reservation is confirmed by
            deposit, that amount remains available for another holiday (even one
            day) during the current years summer. In case of cancellation or
            changes after the term (7 days before arrival date) we charge the
            full amount of the deposit. In case of pre-paid reservation, we will
            not refund any deposited amount. In case you made a reservation on
            other portal or different website, you would have to verify the
            cancellation policies on their side.
          </p>
        </Panel>
      </Collapse>
      <br></br> <br></br>
      <div className="title">
        ACCOMODATIONS
      </div>
      <div className="ok2">
        <Collapse defaultActiveKey={[""]}>
          <Panel
            header="Are beach services included? Does the hotel count with a private beach?"
            key="1"
          >
            <p>
              For all our “all inclusive” guest the beach service is included in
              the price. Beach service means the use of two beach chairs and one
              umbrella (for each booked room) in the beach areas just in front
              of the hotel. Additionaly, it is possible to book beach service
              directly once arrived at the hotel (daily or weekly) with our
              convenient discount agreement at $12,00 daily (two beach chairs
              and one umbrella). Every guest can choose among all the beaches in
              front of the hotel, with a discount agreement for guests, with no
              price difference. Alternatively, you can go to the beach and rent
              how many beach chairs or umbrellas you would prefer at the price
              offered by the beach owner.
            </p>
          </Panel>
          <Panel header="What time does the swimming pool open?" key="2">
            <p>
              Indicative opening times for the swimming pool in the summer
              period are: – morning from 9.30 am to 1.00 pm – afternoon from
              3.00 pm to 7.00 pm These times may be changed and extended due to
              weather conditions and to guests peak frequencies. The pool is
              steadily supervised by a proffessional lifeguard. Even when the
              pool is closed to public, the relaxation area with sun loungers
              and umbrellas always remains available, near to the entrance.
            </p>
          </Panel>
          <Panel header="Are pets allowed?" key="3">
            <p>
              Only small sized cats or dogs are allowed. We charge $15,00 for
              the final room cleaning on the departure day.!
            </p>
          </Panel>
          <Panel header="Are there any discounts for children?" key="4">
            <p>There are discount options for children.</p>
          </Panel>
        </Collapse>
      </div>
     
      </div>
    </div>
  );
};
