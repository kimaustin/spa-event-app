// Most of the code below was taken from 
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0319

import { connect } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

// EVENT SCHEMA
// .date -> string
// .desc -> string
// .photo_hash -> string
// .title -> string
// belongs_to .user -> SpaEventApp.Users.User
// has_many .comments -> SpaEventApp.Comments.Comment
// has_many .invitations -> SpaEventApp.Invitations.Invitation

function Field({event, setEvent, field}) {
  function update(ev) {
    let tmp = Object.assign({}, event);
    tmp[field] = ev.target.value;
    setEvent(tmp);
  }

  return (
    <Form.Group>
      <Form.Label>{capitalize(field)}</Form.Label>
      {/* <Form.Control type="text" onChange={update} value={event[field]||""} /> */}
    </Form.Group>
  );
}

function EventForm({event, setEvent}) {
  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(event);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Field event={event} setEvent={setEvent} field="title" />
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

function Events({events, event_form, dispatch}) {
  // No useState
  function setEvent(event) {  
    dispatch({type: 'event_form/set', data: event});
  }
  
  let rows = events.map((event) => (
    <tr key={event.id}>
      <td>{event.title}</td>
      <td>
        <Button variant="secondary"
                onClick={() => setEvent(event)}>
          Edit
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Events</h2>
          <p>
            <Link to="/events/new"><Button variant="primary">New Event</Button></Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Edit Event</h2>
          <EventForm event={event_form} setEvent={setEvent} />
        </Col>
      </Row>
    </div>
  );
}

export default connect(({events, event_form}) => ({events, event_form}))(Events);