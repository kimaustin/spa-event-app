defmodule SpaEventAppWeb.EventView do
  use SpaEventAppWeb, :view
  alias SpaEventAppWeb.EventView
  alias SpaEventAppWeb.UserView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{id: event.id,
      date: event.date,
      desc: event.desc,
      title: event.title,
      photo_hash: event.photo_hash,
      user: render_one(event.user, UserView, "user.json")}
  end

  def render("event_shallow.json", %{event: event}) do
    %{id: event.id,
      date: event.date,
      desc: event.desc,
      title: event.title,
      photo_hash: event.photo_hash,
      user_id: event.user_id}
  end
end
