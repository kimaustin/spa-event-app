defmodule SpaEventApp.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    field :vote, :integer
    # field :user_id, :id
    # field :event_id, :id
    belongs_to :event, SpaEventApp.Events.Event
    belongs_to :user, SpaEventApp.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :vote, :event_id, :user_id])
    |> validate_required([:body, :vote, :event_id, :user_id])
  end
end
