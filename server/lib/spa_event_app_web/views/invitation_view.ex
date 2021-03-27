defmodule SpaEventAppWeb.InvitationView do
  use SpaEventAppWeb, :view
  alias SpaEventAppWeb.InvitationView
  alias SpaEventAppWeb.EventView
  alias SpaEventAppWeb.UserView

  def render("index.json", %{invitations: invitations}) do
    %{data: render_many(invitations, InvitationView, "invitation.json")}
  end

  def render("show.json", %{invitation: invitation}) do
    %{data: render_one(invitation, InvitationView, "invitation.json")}
  end

  def render("invitation.json", %{invitation: invitation}) do
    if invitation.user do
      %{id: invitation.id,
        email: invitation.email,
        response: invitation.response,
        event: render_one(invitation.event, EventView, "event_shallow.json"),
        user: render_one(invitation.user, UserView, "user.json"),
        user_id: invitation.user.id}
    else
      %{id: invitation.id,
        email: invitation.email,
        response: invitation.response,
        event: render_one(invitation.event, EventView, "event_shallow.json"),
        user_id: 0}
    end
  end

end
