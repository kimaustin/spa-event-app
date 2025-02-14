defmodule SpaEventApp.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :string, null: false
      add :vote, :integer, default: 0
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :event_id, references(:events, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:comments, [:user_id])
    create index(:comments, [:event_id])
  end
end
