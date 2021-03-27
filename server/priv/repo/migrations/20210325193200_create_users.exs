defmodule SpaEventApp.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :name, :string, null: false
      add :photo_hash, :string, null: true
      add :password_hash, :string, null: false

      timestamps()
    end

  end
end
