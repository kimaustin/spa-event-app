import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../store';
import { eq } from 'lodash';
import { create_invitation, fetch_invitations } from '../api';


function findEventById(events, id) {
    for (var i = 0; i < events.length; i++) {
        if (events[i].id == id) {
            return events[i];
        }
    }
    return null;
}

function EventsSingle({events, invitations}) { 
    let [invitation, setInvitation] = useState({});
    let state = store.getState();

    console.log(invitations);
    let path_name = window.location.pathname;
    let eventId = path_name.substring(path_name.lastIndexOf("/") + 1);
    let event = findEventById(events, eventId);
    // const invs = invitations;
    let eventInvitations = invitations.filter( (invitation) => eventId == invitation.event_id);
    console.log(eventInvitations);

    let session = state.session;

    function updateEmail(inv) {
        let e1 = Object.assign({}, invitation);
        e1["email"] = inv.target.value;
        setInvitation(e1);
    }

    function submit(inv) {
        inv.preventDefault();
        let e1 = Object.assign({}, invitation);
        e1["response"] = "none";
        e1["event_id"] = eventId;
        e1["user_id"] = session.user_id;
        create_invitation(invitation).then((resp) => {
            if (resp["errors"]) {
                console.log("errors", resp.errors);
            }
            else {
                // history.push("/");
                fetch_invitations();
            }
        });
    }

    console.log(session.user_id);
     
    if (session != null && session.user_id == event.user.id) {
        return (
            <div>
                <h1>Show Event #{event.id}</h1>
                <ul>
                    <li>
                        <strong>Event Picture:</strong>
                    </li>
                    <li><strong>Title: </strong>{event.title}</li>
                    <li><strong>Date: </strong>{event.date}</li>
                    <li><strong>Desc: </strong>{event.desc}</li>
                    <li>
                        <strong>Created By:</strong>
                        {event.user.name}
                    </li>
                </ul>
                
                <h3>Invitations</h3>
                
                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label>email</Form.Label>
                        <Form.Control as="textarea"
                                    rows={4}
                                    onChange={updateEmail}
                                    value={invitation.email} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Add Invitation</Button>
                </Form>

                {/* <Link to="/invitations/new"><Button variant="primary">New Invitation</Button></Link> */}

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
                    <li>
                        <strong>Event Picture:</strong>
                    </li>
                    <li><strong>Title: </strong>{event.title}</li>
                    <li><strong>Date: </strong>{event.date}</li>
                    <li><strong>Desc: </strong>{event.desc}</li>
                    <li>
                        <strong>Created By:</strong>
                        {event.user.name}
                    </li>
                </ul>
                
                <h3>Invitations</h3>
                
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


export default connect(({events, invitations}) => ({events, invitations}))(EventsSingle);
