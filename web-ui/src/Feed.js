// Most of the code below was taken from 
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function photo_path(event) {
  return "http://events-spa.wbdbvaustinkim.com:80/photos/" + event.photo_hash;
}

// Event Schema:
// .date -> string
// .desc -> string
// .photo_hash -> string
// .title -> string
// .user -> User

function Event({event}) {
  return (
    <Col md="3">
      <Card>
        <Card.Text>
          {event.title}<br />
          Posted by {event.user.name}<br />
          {event.date}
        </Card.Text>
        <Card.Img variant="top" src={photo_path(event)} />
        <Card.Text> {event.desc} </Card.Text>
      </Card>
    </Col>
  );
}

function Feed({events, session}) {
  let cards = events.map((event) => (
    <Event event={event} key={event.id} />
  ));

  let new_link = null;
  if (session) {
    new_link = (
      <p><Link to="/events/new">New Event</Link></p>
    )
  }

  return (
    <div>
      <h2>Events Feed</h2>
      { new_link }
      <Row>{cards}</Row>
    </div>
  );
}

export default connect(
  ({events, session}) => ({events, session}))(Feed);