# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :spa_event_app,
  ecto_repos: [SpaEventApp.Repo]

config :spa_event_app,
  mix_env: "#{Mix.env()}"

# Configures the endpoint
config :spa_event_app, SpaEventAppWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "7XPhHMCh1l3rPL1zkiGOSQAnOnvKk5mNu7CfjiS0JQPAcx8KwXpwjkTV2i9xkrfo",
  render_errors: [view: SpaEventAppWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: SpaEventApp.PubSub,
  live_view: [signing_salt: "cWn2m1FW"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
