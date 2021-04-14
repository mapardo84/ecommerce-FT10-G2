import "./faq.less";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const Faq = () => {
  return (
    <div className="section">
      <h1 className="title1">FREQUENTLY ASKED QUESTIONS</h1>
      <h2>All the answers you need!</h2>
      <p>
        Have any quetions or comments about our Hotel? Check out our most
        frequently asked questions below <br></br>and find the answers you
        need.If you can't find the information you're looking for, don't
        hesitate to contact us.
      </p>
      <div className="title">
        <h2>GENERAL</h2>
      </div>
      <Collapse className="ok" defaultActiveKey={[""]}>
        <Panel
          header="Which advantages can i get booking directly from the hotel web site?"
          key="1"
        >
          <p>
            If you will book on this official web site you are going to have the
            best price offered. You will have also a direct and personalized
            contact with Hotel Atlas for an unbelievable holiday in our Hotel!.
          </p>
        </Panel>
        <Panel header="At what time is the Check-In for the room ?" key="2">
          <p>
            Normally our room are available from 1.00 pm. For all our guest
            booking from this web site, we offer the possibility of an early
            check-in (except when the room is still busy by the previous guest
            due to other requests). We offer also the luggage storage service in
            the hotel at the arrival.
          </p>
        </Panel>
        <Panel
          header="Is there any internet connection in the hotel room?"
          key="3"
        >
          <p>
            For all the guest we offer a free Wi-Fi connection available in the
            room and all the hotel’s areas.
          </p>
        </Panel>
        <Panel header="The city TAX is included in the price?" key="4">
          <p>
            No, the city tax is a municipal district fee which has to be paied
            on the arrival at the hotel, for the town of Rimini. The cost is €
            2,00 daily per person, for a maximum of 7 consecutive days. Children
            under 14 years old are free of charge.
          </p>
        </Panel>
        <Panel header="Which is the cancelation policy at the Hotel?" key="5">
          <p>
            In case of cancellation or changes done up to 7 days before the
            expected date of check-in we do not charge any cost. If the
            reservation is confirmed by deposit, that amount remains available
            for another holiday (even one day) during the current summer. In
            case of cancellation or changes after the term (7 days before
            arrival date) we charge the full amount of the deposit. In case of
            pre-paied reservation no money will be give back. For reservations
            on other portals or different websites you have to verify the
            cancellation policies on each of them.
          </p>
        </Panel>
      </Collapse>
      <br></br> <br></br>
      <div className="title">
        <h2>ACCOMODATIONS</h2>
      </div>
      <div className="ok2">
        <Collapse defaultActiveKey={[""]}>
          <Panel
            header="Beach services is included? Are there any Hotel's Private Beach?"
            key="1"
          >
            <p>
              For all our “all inclusive” guest the beach service is included in
              the price. Beach service means the use of 2 sun beds and 1
              umbrella (for each room) in the beach areas just in front of the
              hotel. Otherwise it’s possible to reserve beach service directly
              once arrived at the hotel (daily or weekly) with our convenient
              discount agreement at 12,00 Euro daily (2 sun beds and 1
              umbrella). Every guest can choose among all the beaches in front
              of the hotel, with a discount agreement for guests, with no price
              difference. Alternatively, you can go personally to the beach,
              renting sun beds or umbrellas as you prefer at the price offered
              by the beach owner.
            </p>
          </Panel>
          <Panel header="At what time is the swimming pool open?" key="2">
            <p>
              Indicative opening times for the swimming pool in the summer
              period are: – morning from 9.30 am to 1.00 pm – afternoon from
              3.00 pm to 7.00 pm These times can be changed and extended due to
              weather conditions and to guests peak frequencies. The pool is
              steadily supervised by a lifeguard equipped with rescue patent.
              When the pool is closed, the relaxation area with sun loungers and
              umbrellas remains always available, near to the entrance.
            </p>
          </Panel>
          <Panel header="Pets are allowed?" key="3">
            <p>
              Yes, but only if they are small size. We kindly ask an amount of €
              15,00 for the final room cleaning the departure day.!
            </p>
          </Panel>
          <Panel header="Are there any discounts for children?" key="4">
            <p>
              All the children can get offers and discounted prices. If you have
              one or more children contact us for a personalized quote.!
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
