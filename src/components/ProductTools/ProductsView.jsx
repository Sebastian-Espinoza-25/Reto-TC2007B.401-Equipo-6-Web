import React, { useEffect, useState } from "react";
import "./ProductsView.css";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (sku) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/sku/${sku}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setProducts(products.filter((product) => product.sku !== sku));
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const toggleProductStatus = async (sku) => {
    const updatedProducts = products.map((product) => {
      if (product.sku === sku) {
        return { ...product, enabled: !product.enabled };
      }
      return product;
    });
    setProducts(updatedProducts);

    // TODO: Lógica para actualizar el estado del producto en la base de datos
  };

  return (
    <div className="products-view">
      <div className="header">
        <h2>Lista de Productos</h2>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.sku}>
            <img
              src={`http://localhost${product.image_path}`}
              alt={product.name}
            />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Precio: ${product.price}</p>
              <div className="product-actions">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.sku)}
                >
                  ❌
                </button>
                <button
                  className={`toggle-button ${
                    product.enabled ? "enabled" : "disabled"
                  }`}
                  onClick={() => toggleProductStatus(product.sku)}
                >
                  {product.enabled ? "Deshabilitar" : "Habilitar"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
