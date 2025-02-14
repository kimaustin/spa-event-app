defmodule SpaEventAppWeb.EventController do
  use SpaEventAppWeb, :controller

  alias SpaEventApp.Events
  alias SpaEventApp.Events.Event
  alias SpaEventApp.Photos

  action_fallback SpaEventAppWeb.FallbackController

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, "index.json", events: events)
  end

  def create(conn, %{"event" => event_params}) do
    up = event_params["photo"]
    {:ok, hash} = Photos.save_photo(up.filename, up.path)

    event_params = event_params
      |> Map.put("photo_hash", hash)

    with {:ok, %Event{} = event} <- Events.create_event(event_params) do
      loaded_event = Events.get_event!(event.id)
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_path(conn, :show, event))
      |> render("show.json", event: loaded_event)
    end
  end

  def show(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = Events.get_event!(id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end
end
