# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SpaEventApp.Repo.insert!(%SpaEventApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias SpaEventApp.Repo
alias SpaEventApp.Users.User
alias SpaEventApp.Events.Event
alias SpaEventApp.Invitations.Invitation
alias SpaEventApp.Photos

defmodule Inject do
  def photo(name) do
    photos = Application.app_dir(:spa_event_app, "priv/photos")
    path = Path.join(photos, name)
    {:ok, hash} = Photos.save_photo(name, path)
    hash
  end

  def user(name, email, photo_hash, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, photo_hash: photo_hash, password_hash: hash})
  end
end

elephant = Inject.photo("elephant.jpg")
moon = Inject.photo("moon.jpg")
defaultuser = Inject.photo("defaultuser.jpg")

alice = Inject.user("alice", "alice@mail", defaultuser, "aliceword")
bob = Inject.user("bob", "bob@mail", defaultuser, "bobword")

Repo.insert!(%Event{user_id: alice.id, photo_hash: elephant, title: "Alice's Event", date: "March 10 2021", desc: "Alice's first event."})
Repo.insert!(%Event{user_id: bob.id, photo_hash: moon, title: "Bob's Event", date: "March 12 2021", desc: "Bob's first event."})

Repo.insert!(%Invitation{email: bob.email, response: "no", event_id: 1, user_id: alice.id})
