// Most of the code below was taken from 
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { create_invitation, fetch_invitations} from '../api';

export default function InvitationsNew() {
  let history = useHistory();
  let [invitation, setInvitation] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(invitation);
    create_invitation(invitation).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_einvitation();
      }
    });
  }

  function updateEmail(ev) {
    let i1 = Object.assign({}, invitation);
    i1["email"] = ev.target.value;
    setInvitation(i1);
  }

  function updateResponse(ev) {
    let i1 = Object.assign({}, invitation);
    i1["response"] = ev.target.value;
    setInvitation(i1);
  }

  // Note: File input can't be a controlled input.
  return (
    <Row>
      <Col>
        <h2>New Invitation</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>User Email</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateTitle}
                          value={event.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDate}
                          value={event.date} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Invitation
          </Button>
        </Form>
      </Col>
    </Row>
  );
}