defmodule SpaEventAppWeb.CommentView do
  use SpaEventAppWeb, :view
  alias SpaEventAppWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      body: comment.body,
      vote: comment.vote}
  end
end
