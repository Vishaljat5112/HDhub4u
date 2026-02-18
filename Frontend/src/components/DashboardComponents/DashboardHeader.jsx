export default function DashboardHeader({ activeSection, setActiveSection }) {
  const tabs = ["home", "genres", "trending", "awards"];

  return (
    <div className="bg-linear-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-white mb-4">
        🎬 HDHub4U 
      </h1>

      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition
              ${
                activeSection === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
