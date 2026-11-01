import { useState } from "react";
const applications = [
  {
    company: "Google",
    role: "Software Engineer",
    status: "Interview",
    dateApplied: "20 Oct 2026",
  },
  {
    company: "Amazon",
    role: "SDE 1",
    status: "Applied",
    dateApplied: "22 Oct 2026",
  },
  {
    company: "Microsoft",
    role: "Developer",
    status: "Rejected",
    dateApplied: "24 Oct 2026",
  },
];

function Applications() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = applications.filter((application) => {
    const companyMatches = application.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const roleMatches = application.role
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return companyMatches || roleMatches;
  });
  return (
    <main className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your job applications.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Add Application
        </button>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Your job applications</caption>
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-4">
                Company
              </th>
              <th scope="col" className="px-6 py-4">
                Role
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Date Applied
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No applications found matching your search.
                </td>
              </tr>
            ) : (
              filteredApplications.map((application) => (
                <tr
                  key={application.company}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {application.company}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {application.role}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        application.status === "Interview"
                          ? "bg-green-100 text-green-700"
                          : application.status === "Applied"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {application.dateApplied}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Applications;
