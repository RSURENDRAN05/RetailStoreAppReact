import { useState } from "react";
import { HiOutlinePencil, HiOutlinePlus, HiOutlineSearch, HiOutlineTrash } from "react-icons/hi";
import Layout from "../components/Layout";
import Card from "../components/Card";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import { Input } from "../components/Input";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";
import CustomerStats from "../components/CustomerStats";
import CustomerHeader from "../components/CustomerHeader";

function Customers() {
  const toast = useToast();

  const [customers, setCustomers] = useState([
    { id: 1, name: "Rahul", phone: "9876543210", address: "Chennai" },
    { id: 2, name: "Kumar", phone: "9123456780", address: "Trichy" },
    { id: 3, name: "Arun", phone: "9876501234", address: "Madurai" },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  const addCustomer = () => {
    if (!name || !phone || !address) {
      toast.error("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name,
      phone,
      address,
    };

    setCustomers([...customers, newCustomer]);
    setName("");
    setPhone("");
    setAddress("");

    toast.success("Customer Added Successfully");
  };

  const editCustomer = (customer) => {
    setEditId(customer.id);
    setName(customer.name);
    setPhone(customer.phone);
    setAddress(customer.address);
  };

  const updateCustomer = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === editId ? { ...customer, name, phone, address } : customer
    );

    setCustomers(updatedCustomers);
    setEditId(null);
    setName("");
    setPhone("");
    setAddress("");

    toast.success("Customer Updated Successfully");
  };

  const deleteCustomer = () => {
    setCustomers(customers.filter((customer) => customer.id !== pendingDelete.id));
    toast.success("Customer Deleted Successfully");
    setPendingDelete(null);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", header: "ID", cell: (r) => r.id },
    { key: "name", header: "Name", cell: (r) => r.name },
    { key: "phone", header: "Phone", cell: (r) => r.phone },
    { key: "address", header: "Address", cell: (r) => r.address },
    {
      key: "action",
      header: "Action",
      cell: (r) => (
        <div className="flex justify-end gap-2 sm:justify-start">
          <button
            onClick={() => editCustomer(r)}
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
    <Layout title="Customer Management">
      <CustomerHeader
  onAddCustomer={() => {
    document.getElementById("customerForm")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
/>
      <CustomerStats />
      <div className="mb-6 max-w-sm">
        <div className="relative">
          <HiOutlineSearch className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

  <Card
  id="customerForm"
  title={editId ? "Edit Customer" : "Add New Customer"}
  className="mb-6"
>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Customer Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <Button
          onClick={editId ? updateCustomer : addCustomer}
          variant={editId ? "primary" : "success"}
          className="mt-4"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {editId ? "Update Customer" : "Add Customer"}
        </Button>
      </Card>

      <DataTable columns={columns} rows={filteredCustomers} emptyMessage="No Customers Found" />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete "${pendingDelete?.name}"? This cannot be undone.`}
        onConfirm={deleteCustomer}
        onCancel={() => setPendingDelete(null)}
      />
    </Layout>
  );
}

export default Customers;
