function Overview() {
  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">
        Dashboard Overview
      </h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4  gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-xl font-bold">120</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Books</p>
          <h2 className="text-xl font-bold">340</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Borrowed</p>
          <h2 className="text-xl font-bold">45</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Overdue</p>
          <h2 className="text-xl font-bold text-red-500">6</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">User</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">Brian</td>
              <td>Borrowed Book</td>
              <td>Today</td>
            </tr>

            <tr>
              <td className="py-2">Jane</td>
              <td>Returned Book</td>
              <td>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Overview