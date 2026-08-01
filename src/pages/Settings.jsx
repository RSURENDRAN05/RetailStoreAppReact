import { useState } from "react";
import { HiOutlineSave } from "react-icons/hi";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import { Input, Textarea } from "../components/Input";
import { useToast } from "../context/ToastContext";

function Settings() {
  const toast = useToast();

  const [settings, setSettings] = useState({
    store_name: "ABC Store",
    owner_name: "Tharun",
    phone: "9876543210",
    email: "abcstore@gmail.com",
    address: "Chennai, Tamil Nadu",
    gst: "33ABCDE1234F1Z5",
    invoice_footer: "Thank You! Visit Again.",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = () => {
    toast.success("Settings Saved Successfully (Frontend Demo)");
  };

  return (
    <Layout title="Store Settings">
      <Card title="Store Details" className="max-w-3xl" icon="🏪">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Store Name"
            name="store_name"
            value={settings.store_name}
            onChange={handleChange}
          />
          <Input
            label="Owner Name"
            name="owner_name"
            value={settings.owner_name}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={settings.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <Textarea
            label="Address"
            name="address"
            value={settings.address}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="mt-4">
          <Input
            label="GST Number"
            name="gst"
            value={settings.gst}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <Textarea
            label="Invoice Footer"
            name="invoice_footer"
            value={settings.invoice_footer}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <Button onClick={saveSettings} className="mt-6">
          <HiOutlineSave className="h-4 w-4" />
          Save Settings
        </Button>
      </Card>
    </Layout>
  );
}

export default Settings;
