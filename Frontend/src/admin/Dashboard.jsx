export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Movies</p>
          <h2 className="text-xl font-bold">120</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Downloads</p>
          <h2 className="text-xl font-bold">45K</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Categories</p>
          <h2 className="text-xl font-bold">18</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Admins</p>
          <h2 className="text-xl font-bold">1</h2>
        </div>
      </div>
    </>
  );
}
