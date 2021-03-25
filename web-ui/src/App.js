// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import Users from "./Users";
import "./App.scss";

async function fetchUsers() {
  let text = await fetch("http://198.199.89.228:4000/api/v1/users", {});
  let resp = await text.json();
  return resp.data;
}

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers().then((xs) => setUsers(xs));
    }
  }, [users]);

  return (
    // <div>
    //   <ul>
    //     {users.map((uu) => (<li key={uu.id}>{uu.name}</li>))}
    //   </ul>
    // </div>
    <Container>
      <Users users={users} />
    </Container>
  );
}

export default App;