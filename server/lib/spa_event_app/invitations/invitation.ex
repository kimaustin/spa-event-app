defmodule SpaEventApp.Invitations.Invitation do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invitations" do
    field :email, :string
    field :response, :string
    # field :event_id, :id
    # field :user_id, :id
    belongs_to :event, SpaEventApp.Events.Event
    belongs_to :user, SpaEventApp.Users.User

    timestamps()
  end

  @doc false
  def changeset(invitation, attrs) do
    invitation
    |> cast(attrs, [:email, :response, :event_id, :user_id])
    |> validate_required([:email, :response, :event_id])
  end
end
