import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store';


function UsersList({users}) {

    // function setUser(user) {  
    //     dispatch({type: 'user_form/set', data: user});
    // }

  let rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      {/* <td><Button variant="secondary"
                onClick={() => setUser(user)}>
          Edit
        </Button></td> */}
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Users</h2>
          <p>
            <Link to="/users/new">
                <Button variant="primary">New User</Button>
            </Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );

}

function state2props({users}) {
  return { users };
}

export default connect(state2props)(UsersList);