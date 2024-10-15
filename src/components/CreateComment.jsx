import { useState } from "react";

export default function CreateComment({ postId, addComment, parentCommentId }) {
  const [comment, setComment] = useState("");
  const [isVisibleInput, setIsVisibleInput] = useState(true);

  function handleSubmitComment(e) {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        commentId: Date.now(),
        body: comment,
        replies: [],
      };

      addComment(postId, newComment, parentCommentId);

      setComment("");
      if (parentCommentId) {
        setIsVisibleInput(false);
      }
    }
  }

  return (
    <>
      {isVisibleInput && (
        <form onSubmit={handleSubmitComment}>
          <input
            className="comment-input"
            type="text"
            placeholder={parentCommentId ? "Add reply..." : "Add comment..."}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="add-comment" type="submit">
            Add
          </button>
        </form>
      )}
    </>
  );
}
