export default function SettingsHeader() {
  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-xl">

      <p className="text-sm uppercase tracking-widest">
        SYSTEM SETTINGS
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        Settings
      </h1>

      <p className="mt-3 text-purple-100">
        Manage your store configuration, billing preferences,
        appearance and security.
      </p>

    </div>
  );
}