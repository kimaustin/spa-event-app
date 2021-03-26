# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
use Mix.Config

# database_url =
#   System.get_env("DATABASE_URL") ||
#     raise """
#     environment variable DATABASE_URL is missing.
#     For example: ecto://USER:PASS@HOST/DATABASE
#     """

config :spa_event_app, SpaEventApp.Repo,
  # ssl: true,
  # url: database_url,
  username: "spa_event_app",
  password: "Phez5aing2li",
  database: "spa_event_app_dev",
  hostname: "localhost",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :spa_event_app, SpaEventAppWeb.Endpoint,
  http: [
    port: String.to_integer(System.get_env("PORT") || "4000"),
    transport_options: [socket_opts: [:inet6]]
  ],
  secret_key_base: secret_key_base

config :cors_plug,
  origin: ["http://events-spa.wbdbvaustinkim.com:3000"],
  max_age: 86400,
  methods: ["GET", "POST", "PATCH", "DELETE"]

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
config :spa_event_app, SpaEventAppWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
