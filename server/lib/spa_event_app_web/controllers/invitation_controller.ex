defmodule SpaEventAppWeb.InvitationController do
  use SpaEventAppWeb, :controller
  import Logger

  alias SpaEventApp.Invitations
  alias SpaEventApp.Invitations.Invitation
  alias SpaEventApp.Users

  action_fallback SpaEventAppWeb.FallbackController

  def index(conn, _params) do
    invitations = Invitations.list_invitations()
    render(conn, "index.json", invitations: invitations)
  end

  def create(conn, %{"invitation" => invitation_params}) do
    Logger.info("Creating invitation...")
    user = Users.get_user_by_email(invitation_params["email"])
    if user do
      invitation_params = invitation_params
        |> Map.put("user_id", user.id)
      with {:ok, %Invitation{} = invitation} <- Invitations.create_invitation(invitation_params) do
        loaded_invitation = Invitations.get_invitation!(invitation.id)
        Logger.info("Invitation loaded")
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.invitation_path(conn, :show, invitation))
        |> render("show.json", invitation: loaded_invitation)
      end
    else
        invitation_params = invitation_params
          |> Map.delete("user_id")
        Logger.info("No user found for the invitation")
        with {:ok, %Invitation{} = invitation} <- Invitations.create_invitation(invitation_params) do
          loaded_invitation = Invitations.get_invitation!(invitation.id)
          Logger.info("Invitation loaded")
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.invitation_path(conn, :show, invitation))
          |> render("show.json", invitation: loaded_invitation)
        end
    end
  end

  def show(conn, %{"id" => id}) do
    invitation = Invitations.get_invitation!(id)
    render(conn, "show.json", invitation: invitation)
  end

  def update(conn, %{"id" => id, "invitation" => invitation_params}) do
    invitation = Invitations.get_invitation!(id)

    with {:ok, %Invitation{} = invitation} <- Invitations.update_invitation(invitation, invitation_params) do
      render(conn, "show.json", invitation: invitation)
    end
  end

  def delete(conn, %{"id" => id}) do
    invitation = Invitations.get_invitation!(id)

    with {:ok, %Invitation{}} <- Invitations.delete_invitation(invitation) do
      send_resp(conn, :no_content, "")
    end
  end
end
