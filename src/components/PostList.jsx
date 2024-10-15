import { useState } from "react";
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

export default function PostList({ posts, onDelete, addComment }) {
  const [visibleComments, setVisibleComments] = useState({});

  const toggleCommentsVisibility = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <div className="post-card">
              <div className="post-title-container">
                <h3>{post.postTitle}</h3>
                <button
                  onClick={() => onDelete(post.id)}
                  className="delete-post"
                >
                  X
                </button>
              </div>
              <div className="image-container">
                <img src={post.postImage} />
              </div>
              <div className="description-container">
                <p className="description">
                  <span>
                    <b>Description: </b>
                  </span>
                  {post.postDescription}
                </p>
                <CreateComment addComment={addComment} postId={post.id} />
              </div>
              <button
                className="show-comments-btn"
                onClick={() => toggleCommentsVisibility(post.id)}
              >
                {visibleComments[post.id] ? "Hide" : "Show"}
              </button>
            </div>
            {visibleComments[post.id] && (
              <CommentList
                comments={post.comments}
                addComment={addComment}
                postId={post.id}
              />
            )}
          </div>
        ))
      ) : (
        <p>No posts avaiable</p>
      )}
    </>
  );
}
