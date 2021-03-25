defmodule SpaEventApp.Repo do
  use Ecto.Repo,
    otp_app: :spa_event_app,
    adapter: Ecto.Adapters.Postgres
end
