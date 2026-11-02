import { useState } from "react";
import type { SyntheticEvent } from "react";
import type {
  Application,
  CreateApplicationInput,
  ApplicationStatus,
} from "../types/application";

function isApplicationStatus(value: string): value is ApplicationStatus {
  return [
    "saved",
    "applied",
    "interview",
    "offer",
    "rejected",
    "withdrawn",
  ].includes(value);
}



function Applications() {
  const [searchTerm, setSearchTerm] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [applications, setApplications] = useState<Application[]>([
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
      role: "SDE 1",
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
      role: "Backend Developer",
      status: "rejected",
      location: "Bengaluru",
      job_url: null,
      date_applied: "2026-10-24",
      notes: null,
      created_at: "2026-10-24T10:00:00.000Z",
      updated_at: "2026-10-24T10:00:00.000Z",
    },
  ]);

  const filteredApplications = applications.filter((application) => {
    const companyMatches = application.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const roleMatches = application.role
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return companyMatches || roleMatches;
  });

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const company = formData.get("company");
    const role = formData.get("role");
    const status = formData.get("status");
    const location = formData.get("location");
    const jobUrl = formData.get("job_url");
    const dateApplied = formData.get("date_applied");
    const notes = formData.get("notes");

    if (
      typeof company !== "string" ||
      typeof role !== "string" ||
      typeof status !== "string"
    ) {
      return;
    }

    if (!isApplicationStatus(status)) {
      return;
    }

    const optionalLocation =
      typeof location === "string" && location !== "" ? location : undefined;

    const optionalJobUrl =
      typeof jobUrl === "string" && jobUrl !== "" ? jobUrl : undefined;

    const optionalDateApplied =
      typeof dateApplied === "string" && dateApplied !== ""
        ? dateApplied
        : undefined;

    const optionalNotes =
      typeof notes === "string" && notes !== "" ? notes : undefined;

    const applicationData: CreateApplicationInput = {
      company,
      role,
      status,
      location: optionalLocation,
      job_url: optionalJobUrl,
      date_applied: optionalDateApplied,
      notes: optionalNotes,
    };

    console.log(applicationData);
  }
  return (
    <main className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your job applications.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Application
        </button>
      </div>

      {isFormOpen && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold">Add New Application</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="company"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Company *
              </label>

              <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Google"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Role *
              </label>

              <input
                id="role"
                name="role"
                type="text"
                placeholder="e.g. Software Engineer"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Status *
              </label>

              <select
                id="status"
                name="status"
                required
                defaultValue="saved"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Bengaluru"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="job_url"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Job URL
              </label>

              <input
                id="job_url"
                name="job_url"
                type="url"
                placeholder="https://example.com/job"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="date_applied"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Date Applied
              </label>

              <input
                id="date_applied"
                name="date_applied"
                type="date"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Add any notes about this application..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Application
              </button>
            </div>
          </form>
        </div>
      )}

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
                  key={application.id}
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

                  <td className="px-6 py-4 text-gray-600">
                    {application.date_applied}
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
