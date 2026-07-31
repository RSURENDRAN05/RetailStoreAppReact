import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Rice", price: 60, stock: 25 },
    { id: 2, name: "Oil", price: 180, stock: 8 },
    { id: 3, name: "Sugar", price: 48, stock: 15 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Add Product
  const addProduct = () => {
    if (!name || !price || !stock) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      stock,
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
    setStock("");

    alert("✅ Product Added Successfully");
  };

  // Edit Product
  const editProduct = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
  };

  // Update Product
  const updateProduct = () => {
    const updated = products.map((p) =>
      p.id === editId
        ? {
            ...p,
            name,
            price,
            stock,
          }
        : p
    );

    setProducts(updated);

    setEditId(null);
    setName("");
    setPrice("");
    setStock("");

    alert("✅ Product Updated Successfully");
  };

  // Delete Product
  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    setProducts(products.filter((p) => p.id !== id));

    alert("🗑 Product Deleted Successfully");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#F1F5F9",
        }}
      >
        <h1>📦 Product Management</h1>

        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <button
          onClick={editId ? updateProduct : addProduct}
          style={{
            padding: "10px 20px",
            background: editId ? "#2563EB" : "#16A34A",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editId ? "💾 Update Product" : "➕ Add Product"}
        </button>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "30px",
            borderCollapse: "collapse",
            background: "white",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>
                  <span
                    style={{
                      color: product.stock <= 5 ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {product.stock}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => editProduct(product)}
                    style={{
                      background: "#16A34A",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{
                      background: "#DC2626",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;