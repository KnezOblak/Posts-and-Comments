import { useState, useRef } from "react";

export default function CreatePost({ addPost }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      postTitle: title,
      postImage: image,
      postDescription: description,
      comments: [],
    };

    addPost(newPost);

    fileInputRef.current.value = "";
    setTitle("");
    setDescription("");
    setImage("");
    setIsOpen(false);
    console.log(isOpen);
  }

  function handleImageChange(e) {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImage(imageURL);
  }

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button className="add-post-btn" onClick={handleToggle}>
        Add Post
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <form className="post-form" onSubmit={handleSubmit}>
              <input
                id="title-field"
                type="text"
                value={title}
                placeholder="Add title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor="file-upload" className="upload-btn">
                Upload
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add description"
              />
              <button className="upload-btn create" type="submit">
                Create Post
              </button>
            </form>
            <div>
              <button className="close-modal-btn" onClick={handleToggle}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
