defmodule SpaEventApp.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :string
    field :desc, :string
    field :photo_hash, :string
    field :title, :string
    # field :user_id, :id
    belongs_to :user, SpaEventApp.Users.User
    has_many :comments, SpaEventApp.Comments.Comment
    has_many :invitations, SpaEventApp.Invitations.Invitation

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:date, :desc, :title, :photo_hash, :user_id])
    |> validate_required([:date, :desc, :title, :photo_hash, :user_id])
  end
end
