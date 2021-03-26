defmodule SpaEventAppWeb.PostController do
  use SpaEventAppWeb, :controller

  def create(conn, %{"name" => name, "password" => password}) do
    user = SpaEventApp.Users.get_user_by_name!(name)
    # TODO: Verify password
    sess = %{
      user_id: user.id,
      name: user.name,
      token: Phoenix.Token.sign(conn, "user_id", user.id),
    }
    conn
    |> put_resp_header("content-type", "application/json; charset=UTF-8")
    |> send_resp(:created, Jason.encode!(sess))
  end
end
