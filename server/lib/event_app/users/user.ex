defmodule SpaEventApp.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :photo_hash, :string
    has_many :events, SpaEventApp.Events.Event
    has_many :comments, SpaEventApp.Comments.Comment
    has_many :invitations, SpaEventApp.Invitations.Invitation

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :photo_hash])
    |> validate_required([:email, :name, :photo_hash])
  end
end
