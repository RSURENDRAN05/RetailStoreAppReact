import { useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineSave,
  HiOutlineTrash,
  HiOutlineSearch,
} from "react-icons/hi";

import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import { Input, Select } from "../components/Input";
import { useToast } from "../context/ToastContext";
import BillingHeader from "../components/BillingHeader";

function Billing() {
  const toast = useToast();

  const [customers] = useState([
    { id: 1, name: "Rahul" },
    { id: 2, name: "Kumar" },
    { id: 3, name: "Arun" },
    { id: 4, name: "Priya" },
  ]);

  const [products] = useState([
    { id: 1, name: "Rice", price: 60 },
    { id: 2, name: "Oil", price: 180 },
    { id: 3, name: "Sugar", price: 48 },
    { id: 4, name: "Milk", price: 35 },
    { id: 5, name: "Soap", price: 45 },
    { id: 6, name: "Biscuit", price: 20 },
  ]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [billItems, setBillItems] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = () => {
    if (!productId) {
      toast.error("Please Select Product");
      return;
    }

    const product = products.find(
      (p) => p.id === Number(productId)
    );

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

    toast.success("Product Added");
  };

  const removeItem = (index) => {
    setBillItems(
      billItems.filter((_, i) => i !== index)
    );
  };

  const subtotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const gst = subtotal * 0.18;

  const discount = subtotal > 1000 ? 100 : 0;

  const grandTotal = subtotal + gst - discount;

  const saveBill = () => {
    if (!customerId) {
      toast.error("Select Customer");
      return;
    }

    if (billItems.length === 0) {
      toast.error("No Products Added");
      return;
    }

    toast.success("Bill Saved Successfully");

    setCustomerId("");
    setProductId("");
    setQuantity(1);
    setBillItems([]);
  };return (
  <Layout title="Billing">
    <BillingHeader />

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* LEFT SIDE */} </div>

      <div className="xl:col-span-2 space-y-6">

        <Card title="Create New Bill">

          <div className="mb-5 relative">

            <HiOutlineSearch className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 dark:border-slate-700 dark:bg-slate-900"
            />

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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

              {filteredProducts.map((p) => (
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

              <Button
                onClick={addItem}
                variant="success"
                className="w-full"
              >

                <HiOutlinePlus className="h-4 w-4" />

                Add Item

              </Button>

            </div>

          </div>

        </Card>        {/* RIGHT SIDE */}

        <div>

          <Card title="🛒 Shopping Cart">

            {billItems.length === 0 ? (

              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500 dark:border-slate-700">

                No Products Added

              </div>

            ) : (

              <div className="space-y-3">

                {billItems.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700"
                  >

                    <div>

                      <h3 className="font-semibold text-slate-800 dark:text-white">

                        {item.name}

                      </h3>

                      <p className="text-sm text-slate-500">

                        ₹{item.price} × {item.quantity}

                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <span className="font-bold">

                        ₹{item.total}

                      </span>

                      <button
                        onClick={() => removeItem(index)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                      >

                        <HiOutlineTrash className="h-5 w-5" />

                      </button>

                    </div>

                  </div>

                ))}

                <div className="mt-6 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

                  <div className="flex justify-between py-1">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span>GST (18%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span>Discount</span>
                    <span>- ₹{discount.toFixed(2)}</span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between text-xl font-bold text-brand-600">

                    <span>Grand Total</span>

                    <span>₹{grandTotal.toFixed(2)}</span>

                  </div>

                  <Button
                    onClick={saveBill}
                    className="mt-5 w-full"
                  >

                    <HiOutlineSave className="mr-2 h-5 w-5" />

                    Save Bill

                  </Button>

                </div>

              </div>

            )}

          </Card>

        </div>

      </div>

    </Layout>
  );
}

export default Billing;