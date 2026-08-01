import { useState } from "react";
import { HiOutlinePlus, HiOutlineSave, HiOutlineTrash } from "react-icons/hi";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import { Input, Select } from "../components/Input";
import { useToast } from "../context/ToastContext";

function Billing() {
  const toast = useToast();

  const [customers] = useState([
    { id: 1, name: "Rahul" },
    { id: 2, name: "Kumar" },
    { id: 3, name: "Arun" },
  ]);

  const [products] = useState([
    { id: 1, name: "Rice", price: 60 },
    { id: 2, name: "Oil", price: 180 },
    { id: 3, name: "Sugar", price: 48 },
  ]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [billItems, setBillItems] = useState([]);

  const addItem = () => {
    if (!productId) {
      toast.error("Select a Product");
      return;
    }

    const product = products.find((p) => p.id === Number(productId));
    if (!product) return;

    const newItem = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: Number(quantity),
      total: product.price * Number(quantity),
    };

    setBillItems([...billItems, newItem]);
    setProductId("");
    setQuantity(1);
  };

  const removeItem = (index) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const grandTotal = billItems.reduce((sum, item) => sum + item.total, 0);

  const saveBill = () => {
    if (!customerId) {
      toast.error("Select Customer");
      return;
    }

    if (billItems.length === 0) {
      toast.error("Add at least one Product");
      return;
    }

    toast.success("Bill Saved Successfully (Frontend Demo)");

    setCustomerId("");
    setProductId("");
    setQuantity(1);
    setBillItems([]);
  };

  return (
    <Layout title="Billing">
      <Card title="New Bill" className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select
            label="Product"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - ₹{p.price}
              </option>
            ))}
          </Select>

          <Input
            label="Quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="flex items-end">
            <Button onClick={addItem} variant="success" className="w-full">
              <HiOutlinePlus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Bill Items">
        {billItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No Items Added
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {billItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    ₹{item.total}
                  </p>
                  <button
                    onClick={() => removeItem(index)}
                    aria-label="Remove item"
                    className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Total + save — sticks to the viewport bottom on small screens so it's always reachable */}
      <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:rounded-xl lg:border lg:px-6 lg:shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Grand Total: <span className="text-brand-600 dark:text-brand-400">₹{grandTotal}</span>
          </p>
          <Button onClick={saveBill} className="w-full sm:w-auto">
            <HiOutlineSave className="h-4 w-4" />
            Save Bill
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Billing;
