// Most of the code below was taken from
// https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0323

import store from './store';

async function api_get(path) {
  // let text = await fetch("http://198.199.89.228:4000/api/v1" + path, {});
  let text = await fetch("http://events-spa.wbdbvaustinkim.com:80/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  // let text = await fetch("http://198.199.89.228:4000/api/v1" + path, opts);
  let text = await fetch("http://events-spa.wbdbvaustinkim.com:80/api/v1" + path, opts);
  return await text.json();
}

export function fetch_users() {
  api_get("/users").then((data) => {
    let action = {
      type: 'users/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function fetch_events() {
  api_get("/events").then((data) => {
    let action = {
      type: 'events/set',
      data: data,
    }
    store.dispatch(action);
  });
}

// export function fetch_event_with_id(event_id) {
//   api_get("/events/" + event_id).then((data) => {
//     let action = {
//       type: 'events/set',
//       data: data,
//     }
//     store.dispatch(action);
//   });
// }

export function fetch_invitations() {
  api_get("/invitations").then((data) => {
    let action = {
      type: 'invitations/set',
      data: data,
    }
    store.dispatch(action);
  });
}

export function api_login(name, password) {
  api_post("/session", {name, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
     let action = {
        type: 'error/set',
        data: data.error,
      }
      store.dispatch(action);
    }
  });
}

export function create_user(user) {
  return api_post("/users", {user});
}

export async function create_event(event) {
  let state = store.getState();
  let token = state?.session?.token;
  let user_id = state?.session?.user_id;

  let data = new FormData();
  data.append("event[date]", event.date);
  data.append("event[desc]", event.desc);
  data.append("event[photo]", event.photo);
  data.append("event[title]", event.title);
  data.append("event[user_id]", user_id);
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
    // fetch will magically do the right thing
    // with our FormData:
    //  - It's going to read the file
    //  - It's going to pick correct headers
    //  - multipart-form-data
  };
  let text = await fetch(
    "http://events-spa.wbdbvaustinkim.com:80/api/v1/events", opts);
  return await text.json();
}

export async function create_invitation(invitation) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("invitation[email]", invitation.email);
  data.append("invitation[response]", invitation.response);
  data.append("invitation[event_id]", invitation.event_id);
  data.append("invitation[user_id]", invitation.user_id);
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
  };
  let text = await fetch(
    "http://events-spa.wbdbvaustinkim.com:80/api/v1/invitations", opts);
  return await text.json();
}

export async function update_invitation(invitation) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("invitation[id]", invitation.id);
  data.append("invitation[email]", invitation.email);
  data.append("invitation[response]", invitation.response);
  data.append("invitation[event_id]", invitation.event.id);
  data.append("invitation[user_id]", invitation.user.id);
  let opts = {
    method: 'PUT',
    body: data,
    headers: {
      'x-auth': token
    },
  };
  let text = await fetch(
    "http://events-spa.wbdbvaustinkim.com:80/api/v1/invitations/" + invitation.id, opts);
  return await text.json();
}


export function load_defaults() {
  fetch_events();
  fetch_users();
  fetch_invitations();
}
