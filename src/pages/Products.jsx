import { useState } from "react";
import { HiOutlinePencil, HiOutlinePlus, HiOutlineSearch, HiOutlineTrash } from "react-icons/hi";
import Layout from "../components/Layout";
import Card from "../components/Card";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { Input } from "../components/Input";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";
import ProductHeader from "../components/ProductHeader";
import ProductStats from "../components/ProductStats";

function Products() {
  const toast = useToast();

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
  const [pendingDelete, setPendingDelete] = useState(null);

  const addProduct = () => {
    if (!name || !price || !stock) {
      toast.error("Please fill all fields");
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

    toast.success("Product Added Successfully");
  };

  const editProduct = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
  };

  const updateProduct = () => {
    const updated = products.map((p) =>
      p.id === editId ? { ...p, name, price, stock } : p
    );

    setProducts(updated);
    setEditId(null);
    setName("");
    setPrice("");
    setStock("");

    toast.success("Product Updated Successfully");
  };

  const deleteProduct = () => {
    setProducts(products.filter((p) => p.id !== pendingDelete.id));
    toast.success("Product Deleted Successfully");
    setPendingDelete(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", header: "ID", cell: (r) => r.id },
    { key: "name", header: "Product Name", cell: (r) => r.name },
    { key: "price", header: "Price", cell: (r) => `₹${r.price}` },
    {
      key: "stock",
      header: "Stock",
      cell: (r) => (
        <Badge tone={Number(r.stock) <= 5 ? "danger" : "success"}>
          {r.stock}
        </Badge>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: (r) => (
        <div className="flex justify-end gap-2 sm:justify-start">
          <button
            onClick={() => editProduct(r)}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
          >
            <HiOutlinePencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={() => setPendingDelete(r)}
            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-300"
          >
            <HiOutlineTrash className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout title="Product Management">
      <ProductHeader
  onAddProduct={() => {
    document.getElementById("productForm")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
/>

<ProductStats />
      <div className="mb-6 max-w-sm">
        <div className="relative">
          <HiOutlineSearch className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card
  id="productForm"
  title={editId ? "Edit Product" : "Add Product"}
  className="mb-6"
>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Product Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <Button
          onClick={editId ? updateProduct : addProduct}
          variant={editId ? "primary" : "success"}
          className="mt-4"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {editId ? "Update Product" : "Add Product"}
        </Button>
      </Card>

      <DataTable columns={columns} rows={filteredProducts} emptyMessage="No Products Found" />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${pendingDelete?.name}"? This cannot be undone.`}
        onConfirm={deleteProduct}
        onCancel={() => setPendingDelete(null)}
      />
    </Layout>
  );
}

export default Products;
