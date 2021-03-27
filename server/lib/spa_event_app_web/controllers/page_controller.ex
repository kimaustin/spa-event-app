defmodule SpaEventAppWeb.PageController do
  use SpaEventAppWeb, :controller

  alias SpaEventApp.Photos

  def index(conn, _params) do
    events = SpaEventApp.Events.list_events()
    |> SpaEventApp.Events.load_votes()
    render(conn, "index.html", events: events)
  end

  def photo(conn, %{"hash" => hash}) do
    {:ok, _name, data} = Photos.load_photo(hash)
    conn
    |> put_resp_content_type("image/jpeg")
    |> send_resp(200, data)
  end

end
