import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

function photo_path(event) {
  return "http://198.199.89.228:4000/photos/" + event.photo_hash;
}

function Event({event}) {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={photo_path(event)} />
        <Card.Text>
          Posted by {event.user.name}<br />
          {event.body}
        </Card.Text>
      </Card>
    </Col>
  );
}

function Feed({events}) {
  let cards = events.map((event) => <Event event={event} key={event.id} />);
  return (
    <Row>
      { cards }
    </Row>
  );
}

export default connect(({events}) => ({events}))(Feed);