// Most of the code below was taken from 
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import UsersList from "./Users/List";
import UsersNew from "./Users/New";
import EventsNew from "./Events/New";
import Nav from "./Nav";
import Feed from "./Feed";

function App() {
  return (
    <Container>
      <Nav />
      {/* <BrowserRouter> */}
        <Switch>
          <Route path="/" exact>
            <Feed />
          </Route>
          <Route path="/events/new" exact>
            <EventsNew />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
          <Route path="/users/new" exact>
            <UsersNew />
          </Route>
        </Switch>
      {/* </BrowserRouter> */}
    </Container>
  );
}

export default App;