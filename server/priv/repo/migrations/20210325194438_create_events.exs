defmodule SpaEventApp.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :date, :string, null: false
      add :desc, :string, null: false
      add :title, :string, null: false
      add :photo_hash, :string, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:events, [:user_id])
  end
end
