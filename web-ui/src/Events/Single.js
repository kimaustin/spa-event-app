import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../store';
import { eq } from 'lodash';
import { create_invitation, fetch_invitations } from '../api';


function photo_path(event) {
  return "http://events-spa.wbdbvaustinkim.com:80/photos/" + event.photo_hash;
}

function findEventById(events, id) {
    for (var i = 0; i < events.length; i++) {
        if (events[i].id.toString() === id) {
            return events[i];
        }
    }
    return null;
}

function EventsSingle({events, invitations, session}) {
    let [invitation, setInvitation] = useState({});

    console.log("all invitations = " + invitations)

    let path_name = window.location.pathname;
    let eventId = path_name.substring(path_name.lastIndexOf("/") + 1);
    let event = findEventById(events, eventId);

    console.log("eventId = " + eventId);
    console.log("event = " + event);

    // const invs = invitations;
    let eventInvitations = invitations.filter( (invitation) => eventId === invitation.event.id.toString());
    console.log(eventInvitations);

    // compute sums
    var numNone = 0;
    var numYes = 0;
    var numMaybe = 0;
    var numNo = 0;
    for (var i = 0; i < eventInvitations.length; i++) {
      let response = eventInvitations[i].response;
      if (response === null || response === 'none') {
        ++numNone;
      }
      else if (response === 'yes') {
        ++numYes;
      }
      else if (response === 'maybo') {
        ++numMaybe;
      }
      else if (response === 'no') {
        ++numNo;
      }
    }

    function updateEmail(inv) {
        let inv1 = Object.assign({}, invitation);
        inv1["email"] = inv.target.value;
        setInvitation(inv1);
    }

    function submit(inv) {
        inv.preventDefault();
        let inv1 = Object.assign({}, invitation);
        inv1["response"] = "none";
        inv1["event_id"] = eventId;
        // The invitee user is not known at this time; server needs to take care of this
        //inv1["user_id"] = session.user_id;
        create_invitation(inv1).then((resp) => {
            if (resp["errors"]) {
                console.log("errors", resp.errors);
            }
            else {
                // history.push("/");
                fetch_invitations();
            }
        });
    }


    if (session != null && event.user != null && session.user_id === event.user.id) {
        return (
            <div>
                <h1>Show Event #{event.id}</h1>
                <ul>
                    <li><strong>Event Picture:</strong></li>
                    <li><img variant="top" src={photo_path(event)} width='240' alt=''/></li>
                    <li><strong>Title: </strong>{event.title}</li>
                    <li><strong>Date: </strong>{event.date}</li>
                    <li><strong>Desc: </strong>{event.desc}</li>
                    <li>
                        <strong>Created By:</strong>
                        {event.user.name}
                    </li>
                </ul>

                <h3>Add Invitation</h3>

                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label>email</Form.Label>
                        <Form.Control as="textarea"
                                    rows={1}
                                    onChange={updateEmail}
                                    value={invitation.email} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Add Invitation</Button>
                </Form>

                <h3 style={{ 'paddingTop':'40px' }}>Event Response Link</h3>
                <p>http://events-spa.wbdbvaustinkim.com</p>

                <h3 style={{ 'paddingTop':'40px' }}>Invitations</h3>
                <p>{numYes} yes, {numMaybe} maybe, {numNo} no, {numNone} haven't responded</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Email</th>
                        <th>Response</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventInvitations.map((invitation) => (
                            <tr>
                                <td>{invitation.email}</td>
                                <td>{invitation.response}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
              <h1>Show Event #{event.id}</h1>
              <ul>
                  <li><strong>Event Picture:</strong></li>
                  <li><img variant="top" src={photo_path(event)} width='240' alt=''/></li>
                  <li><strong>Title: </strong>{event.title}</li>
                  <li><strong>Date: </strong>{event.date}</li>
                  <li><strong>Desc: </strong>{event.desc}</li>
                  <li>
                      <strong>Created By:</strong>
                      {event.user.name}
                  </li>
              </ul>

              <h3 style={{ 'paddingTop':'40px' }}>Invitations</h3>
              <p>{numYes} yes, {numMaybe} maybe, {numNo} no, {numNone} haven't responded</p>
              <table className="table table-striped">
                  <thead>
                      <tr>
                      <th>Email</th>
                      <th>Response</th>
                      <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {eventInvitations.map((invitation) => (
                          <tr>
                              <td>{invitation.email}</td>
                              <td>{invitation.response}</td>
                              <td></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
        );
    }

}


export default connect(({events, invitations, session}) => ({events, invitations, session}))(EventsSingle);
