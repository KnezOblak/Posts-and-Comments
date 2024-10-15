import { useState, useEffect } from "react";
import CreateComment from "./CreateComment";

export default function CommentList({ comments, addComment, postId }) {
  const [replyingCommentId, setReplyingCommentId] = useState(null);

  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.commentId} className="comment-section">
            <div className="comment">
              <p>{comment.body}</p>
              <button
                className="reply-btn"
                onClick={() =>
                  setReplyingCommentId(
                    replyingCommentId === comment.commentId
                      ? null
                      : comment.commentId
                  )
                }
              >
                Reply
              </button>
            </div>
            {replyingCommentId === comment.commentId && (
              <CreateComment
                postId={postId}
                addComment={addComment}
                parentCommentId={comment.commentId}
              />
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="reply">
                <CommentList
                  comments={comment.replies}
                  addComment={addComment}
                  postId={postId}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </>
  );
}
