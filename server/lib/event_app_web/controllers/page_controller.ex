defmodule SpaEventAppWeb.PageController do
  use SpaEventAppWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
