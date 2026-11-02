import { Link } from "react-router-dom";
import type { Application } from "../types/application";

const stats = [
  { label: "Total Applications", value: 42 },
  { label: "Interviews", value: 8 },
  { label: "Offers", value: 3 },
  { label: "Rejected", value: 12 },
];

const recentApplications: Application[] = [
  {
    id: 1,
    user_id: 1,
    company: "Google",
    role: "Software Engineer",
    status: "interview",
    location: "Bengaluru",
    job_url: null,
    date_applied: "2026-10-20",
    notes: null,
    created_at: "2026-10-20T10:00:00.000Z",
    updated_at: "2026-10-20T10:00:00.000Z",
  },
  {
    id: 2,
    user_id: 1,
    company: "Amazon",
    role: "SDE I",
    status: "applied",
    location: "Bengaluru",
    job_url: null,
    date_applied: "2026-10-22",
    notes: null,
    created_at: "2026-10-22T10:00:00.000Z",
    updated_at: "2026-10-22T10:00:00.000Z",
  },
  {
    id: 3,
    user_id: 1,
    company: "Microsoft",
    role: "Developer",
    status: "rejected",
    location: "Bengaluru",
    job_url: null,
    date_applied: "2026-10-24",
    notes: null,
    created_at: "2026-10-24T10:00:00.000Z",
    updated_at: "2026-10-24T10:00:00.000Z",
  },
];

function Dashboard() {
  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <p className="mt-1 text-sm text-gray-500">
          Track and manage your job applications.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <h2 className="border-b border-gray-200 px-6 py-4 text-lg font-semibold text-gray-900">
          Recent Applications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">
              Your three most recent job applications
            </caption>
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700">
                    {application.company}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700">
                    {application.role}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        application.status === "interview"
                          ? "bg-green-100 text-green-700"
                          : application.status === "applied"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 px-6 py-4 text-right">
          <Link
            to="/applications"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all applications →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
