// Most of the code below was taken from 
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { create_event, fetch_events } from '../api';

export default function EventsNew() {
  let history = useHistory();
  let [event, setEvent] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(event);
    create_event(event).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_events();
      }
    });
  }

  function updateDate(ev) {
    let e1 = Object.assign({}, event);
    e1["date"] = ev.target.value;
    setEvent(e1);
  }

  function updateDesc(ev) {
    let e1 = Object.assign({}, event);
    e1["desc"] = ev.target.value;
    setEvent(e1);
  }

  function updatePhoto(ev) {
    let e1 = Object.assign({}, event);
    e1["photo"] = ev.target.files[0];
    setEvent(e1);
  }

  function updateTitle(ev) {
    let e1 = Object.assign({}, event);
    e1["title"] = ev.target.value;
    setEvent(e1);
  }

  // Note: File input can't be a controlled input.
  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateTitle}
                          value={event.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>date</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDate}
                          value={event.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file"
                          onChange={updatePhoto} />
          </Form.Group>
          <Form.Group>
            <Form.Label>desc</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDesc}
                          value={event.desc} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Event
          </Button>
        </Form>
      </Col>
    </Row>
  );
}