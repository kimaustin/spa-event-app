defmodule SpaEventAppWeb.SessionController do
  use SpaEventAppWeb, :controller

  import Logger

  def create(conn, %{"name" => name, "password" => password}) do
    Logger.info("Calling Authenticate->")
    user = SpaEventApp.Users.authenticate(name, password)

    if user do
      sess = %{
        user_id: user.id,
        name: user.name,
        token: Phoenix.Token.sign(conn, "user_id", user.id)
      }
      conn
      |> put_resp_header(
        "content-type",
      "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(%{session: sess}))
    else
      conn
      |> put_resp_header(
        "content-type",
      "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(%{error: "fail"}))
    end
  end

  # def delete(conn, _params) do
  #   Logger.info("Deleting session ")
  #   Logger.info(:user_id)
  #   conn
  #   # |> delete_session(:user_id)
  #   |> put_resp_header(
  #       "content-type",
  #     "application/json; charset=UTF-8")
  #   |> send_resp(:unauthorized, Jason.encode!(%{error: "fail"}))
  #   # |> send_resp(:deleted, Jason.encode!(%{}))
  # end

end
