// Most of the code below was taken from
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function photo_path(event) {
  // return "http://198.199.89.228:4000/photos" + event.photo_hash;
  return "http://events-spa.wbdbvaustinkim.com:80/photos/" + event.photo_hash;
}

// Event Schema:
// .date -> string
// .desc -> string
// .photo_hash -> string
// .title -> string
// .user -> User

function Event({event}) {
  // var event_path = "/events/" + event.id

  return (
    <Col md="3">
      <Card>
        <Card.Img variant="top" src={photo_path(event)} />
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
          Posted by {event.user.name}<br />
          {event.date}<br />
          {event.desc}
        </Card.Text>
        <Link to={{pathname: `/events/` + event.id}}>
          <Button variant="primary">View Event</Button>
        </Link>
      </Card>
    </Col>
  );
}

// Invitaiton Schema
// .email -> string
// .response -> string
// belongs_to .event -> SpaEventApp.Events.Event
// belongs_to .user -> SpaEventApp.Users.User

function Invitation({invitation}) {
  return (
    <Col md="3">
      <Card>
        <Card.Text>
          You're invited to: {invitation.event.title}<br />
          Your Response: {invitation.response}
        </Card.Text>
        <Link to={{pathname: `/invitation/` + invitation.id}}>
          <Button variant="primary">Edit Response</Button>
        </Link>
      </Card>
    </Col>
  );
}

function Dashboard({events, invitations, session}) {
  let event_cards = events.map((event) => (
    <Event event={event} key={event.id} />
  ));

  let eventInvitations = invitations.filter( (invitation) => session && session.user_id === invitation.user_id);

  let inv_cards = eventInvitations.map((invitation) => (
    <Invitation invitation={invitation} key={invitation.id} />
  ));

  let new_link = null;
  if (session) {
    new_link = (
      <p><Link to="/events/new">New Event</Link></p>
    )
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Events</h3>
        { new_link }
        <Row>{event_cards}</Row>
      </div>
      <div style={{'paddingTop': '30px'}}>
        <h3>Invitations</h3>
        <Row>{inv_cards}</Row>
      </div>
    </div>
  );
}

export default connect(
  ({events, invitations, session}) => ({events, invitations, session}))(Dashboard);
