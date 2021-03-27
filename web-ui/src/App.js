// Most of the code below was taken from
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import UsersList from "./Users/List";
import UsersNew from "./Users/New";
import EventsNew from "./Events/New";
import EventsList from "./Events/List";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import EventsSingle from "./Events/Single";
import InvitationsEdit from "./Invitations/Edit";

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/events">
          <EventsList />
        </Route>
        <Route path="/events/new">
          <EventsNew />
        </Route>
        <Route exact path="/users">
          <UsersList />
        </Route>
        <Route path="/users/new">
          <UsersNew />
        </Route>
        <Route path="/events/:eventId?">
          <EventsSingle />
        </Route>
        <Route path="/invitation/:invitationId?">
          <InvitationsEdit />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
