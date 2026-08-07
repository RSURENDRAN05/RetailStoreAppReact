import { useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

function Profile() {
  const [profile, setProfile] = useState({
    shopId: "SHOP001",
    username: "admin",
    name: "Admin",
    email: "admin@gmail.com",
    phone: "9876543210",
    address: "Chennai",
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title="My Profile">
      <Card title="My Profile">
        <div className="flex flex-col items-center">

          <img
            src={localStorage.getItem("storeLogo")}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
          />

          <h2 className="mt-4 text-2xl font-bold">
            {profile.name}
          </h2>

          <p className="text-slate-500">
            Store Administrator
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="font-semibold">
                Shop ID
              </label>

              <input
                className="mt-1 w-full rounded-lg border p-3"
                name="shopId"
                value={profile.shopId}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="font-semibold">
                Username
              </label>

              <input
                className="mt-1 w-full rounded-lg border p-3"
                name="username"
                value={profile.username}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
                className="mt-1 w-full rounded-lg border p-3"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                className="mt-1 w-full rounded-lg border p-3"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="font-semibold">
                Phone Number
              </label>

              <input
                className="mt-1 w-full rounded-lg border p-3"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="font-semibold">
                Address
              </label>

              <input
                className="mt-1 w-full rounded-lg border p-3"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>

          </div>

          <div className="mt-8 flex gap-4">

            {!edit ? (
              <Button onClick={() => setEdit(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setEdit(false);
                  alert("Profile Updated Successfully");
                }}
              >
                Save Profile
              </Button>
            )}

          </div>

        </div>
      </Card>
    </Layout>
  );
}

export default Profile;