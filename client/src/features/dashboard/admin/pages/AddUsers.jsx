import React, { useState } from "react";

function AddUsers() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("User added successfully!");
  };

  return (
    <div className="mx-auto mt-6 max-w-5xl px-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5 text-white">
          <h2 className="text-2xl font-semibold">Create User Account</h2>
          <p className="mt-1 text-sm text-indigo-100">
            Super admins can create new users, assign roles, and control account status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
            <section className="rounded-xl border border-gray-200 p-4">
              <h3 className="text-base font-semibold text-gray-800">Basic Information</h3>
              <p className="mt-1 text-sm text-gray-500">Set the user's profile and login identity.</p>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    placeholder="Choose username"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 p-4">
              <h3 className="text-base font-semibold text-gray-800">Access Control</h3>
              <p className="mt-1 text-sm text-gray-500">Define how this user can access the platform.</p>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Temporary Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    placeholder="Set temporary password"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  >
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Account Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create User
              </button>
            </div>
          </form>

          <aside className="space-y-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
            <h3 className="text-base font-semibold text-indigo-900">Super Admin Checklist</h3>
            <ul className="space-y-2 text-sm text-indigo-900/90">
              <li>Use a valid work email to support password recovery.</li>
              <li>Assign only the minimum role required for the user.</li>
              <li>Set inactive status for users joining later.</li>
              <li>Share temporary password securely, not by public chat.</li>
            </ul>

            <div className="rounded-lg border border-indigo-200 bg-white p-3">
              <p className="text-sm font-medium text-gray-800">Role Quick Guide</p>
              <p className="mt-1 text-xs text-gray-600">
                Admin manages records and users, Teacher manages learning content, Student has basic portal access.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AddUsers;