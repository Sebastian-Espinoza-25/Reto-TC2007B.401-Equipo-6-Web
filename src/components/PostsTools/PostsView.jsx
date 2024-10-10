import React, { useEffect, useState } from "react";
import "./PostsView.css";

const PostsView = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (post_id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este post?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/post//posts/${post_id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setPosts(posts.filter((post) => post.post_id !== post_id));
        }
      } catch (error) {
        console.error("Error al eliminar el post:", error);
      }
    }
  };

  const togglePostStatus = async (post_id) => {
    const updatedPosts = posts.map((post) => {
      if (post.post_id === post_id) {
        return { ...post, enabled: !post.enabled };
      }
      return post;
    });
    setPosts(updatedPosts);

    // TODO: Lógica para actualizar el estado del producto en la base de datos
  };

  return (
    <div className="posts-view">
      <div className="header">
        <h2>Lista de Posts</h2>
        <input
          type="text"
          placeholder="Buscar por titulo"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div className="post-card" key={post.post_id}>
            <img src={`http://localhost/${post.file_path}`} alt={post.title} />
            <div className="post-info">
              <h2>{post.title}</h2>
              <p className="post-summary">{post.summary}</p>
              <p>Categoría: {post.category}</p>
              <p>Fecha: {post.date}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(post.post_id)}
              >
                ❌
              </button>
              <button
                className={`toggle-button ${
                  post.enabled ? "enabled" : "disabled"
                }`}
                onClick={() => togglePostStatus(post.post_id)}
              >
                {posts.enabled ? "Deshabilitar" : "Habilitar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsView;
