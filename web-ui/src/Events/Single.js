import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

function findEventById(events, id) {
    for (var i = 0; i < events.length; i++) {
        if (events[i].id == id) {
            return events[i];
        }
    }
    return null;
}

function EventsSingle({events}, props) { 
    let path_name = window.location.pathname;
    let eventId = path_name.substring(path_name.lastIndexOf("/") + 1);
    let event = findEventById(events, eventId);
    console.log(event);
    return (
        <div>
            <h1>Show Event #{event.id}</h1>
            <Col md="3">
                <Card>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                        Posted by {event.user.name}<br />
                        {event.date}<br />
                        {event.desc} 
                    </Card.Text>
                </Card>
            </Col>
        </div>
    );
}


export default connect(({events}) => ({events}))(EventsSingle);

// import { connect } from 'react-redux';
// import { Row, Col, Form, Button, Card } from 'react-bootstrap';
// import capitalize from 'lodash/capitalize';

// // EVENT SCHEMA
// // .date -> string
// // .desc -> string
// // .photo_hash -> string
// // .title -> string
// // belongs_to .user -> SpaEventApp.Users.User
// // has_many .comments -> SpaEventApp.Comments.Comment
// // has_many .invitations -> SpaEventApp.Invitations.Invitation

// function EventsSingle({event}) {
//   // No useState
//   function setEvent(event) {  
//     dispatch({type: 'event_form/set', data: event});
//   }
  
//   let rows = events.map((event) => (
//     <tr key={event.id}>
//       <td>{event.title}</td>
//       <td>
//         <Button variant="secondary"
//                 onClick={() => setEvent(event)}>
//           Edit
//         </Button>
//       </td>
//     </tr>
//   ));

//   return (
//     // <div>
//     //     <h1>Show Event #{event.id}</h1>
//     //     <Col md="3">
//     //         <Card>
//     //             <Card.Title>{event.title}</Card.Title>
//     //             <Card.Text>
//     //                 Posted by {event.user.name}<br />
//     //                 {event.date}<br />
//     //                 {event.desc} 
//     //             </Card.Text>
//     //         </Card>
//     //     </Col>
//     // </div>

//     <div>
//       <Row>
//         <Col>
//           <h2>List Events</h2>
//           <p>
//             <Button variant="secondary"
//                     onClick={() => setEvent({})}>
//               New Event
//             </Button>
//           </p>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               { rows }
//             </tbody>
//           </table>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <h2>Edit Event</h2>
//           <EventForm event={event_form} setEvent={setEvent} />
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default connect(({events, event_form}) => ({events, event_form}))(Events);