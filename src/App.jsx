import "./App.css";
import { useState, useEffect } from "react";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error("Failed to parse posts from local storage: ", error);
        setPosts([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  function addPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function handleDeleteButton(postId) {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  }

  function addComment(postId, newComment, parentCommentId = null) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: parentCommentId
                ? nestedReplies(post.comments, parentCommentId, newComment)
                : [...post.comments, newComment],
            }
          : post
      )
    );
  }

  function nestedReplies(comments, parentCommentId, newReply) {
    return comments.map((comment) => {
      if (comment.commentId === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: nestedReplies(comment.replies, parentCommentId, newReply),
        };
      } else {
        return comment;
      }
    });
  }

  return (
    <>
      <PostList
        posts={posts}
        onDelete={handleDeleteButton}
        addComment={addComment}
      />
      <CreatePost addPost={addPost} />
    </>
  );
}

export default App;
