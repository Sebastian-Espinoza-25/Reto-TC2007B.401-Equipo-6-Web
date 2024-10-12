import React, { useEffect, useState } from "react";
import "../styles/ViewStyles.css";

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
          `${process.env.REACT_APP_API_URL}/Posts/${post_id}`,
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

  return (
    <div className="view">
      <input
        type="text"
        placeholder="Buscar por titulo"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="container">
        {filteredPosts.map((post) => (
          <div className="card" key={post.post_id}>
            <img src={`${post.image_path}`} alt={post.title} />
            <div className="info">
              <h3>{post.title}</h3>
              <p className="summary">{post.summary}</p>
              <p className="category">Categoría: {post.category}</p>
              <p className="date">Fecha: {post.date}</p>
              <p className="author">Autor: {post.partner_email}</p>
              <div className="actions">
                <button
                  className="view-post"
                  onClick={() => window.open(post.file_path, "_blank")}
                >
                  POST COMPLETO 📄
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(post.post_id)}
                >
                  ELIMINAR ❌
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsView;
