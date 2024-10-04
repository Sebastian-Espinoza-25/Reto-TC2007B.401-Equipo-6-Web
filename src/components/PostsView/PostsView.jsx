import React, { useEffect, useState } from "react";
import "./PostsView.css";

const PostsView = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
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

  return (
    <div className="posts-view">
      <h1>Lista de Posts</h1>
      <input
        type="text"
        placeholder="Buscar por título"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div className="post-card" key={post.post_id}>
            <img src={`http://localhost${post.image_path}`} alt={post.title} />
            <div className="post-info">
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <p>Categoría: {post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsView;
