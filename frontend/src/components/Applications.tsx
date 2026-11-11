import { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";
import {
  getApplications,
  createApplication,
} from "../services/applicationService";
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

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load applications",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadApplications();
  }, []);

  const filteredApplications = applications.filter((application) => {
    const search = searchTerm.toLowerCase();

    const companyMatches = application.company.toLowerCase().includes(search);
    const roleMatches = application.role.toLowerCase().includes(search);

    return companyMatches || roleMatches;
  });

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

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

    const applicationData: CreateApplicationInput = {
      company,
      role,
      status,
      ...(typeof location === "string" && location !== "" && { location }),
      ...(typeof jobUrl === "string" && jobUrl !== "" && { job_url: jobUrl }),
      ...(typeof dateApplied === "string" &&
        dateApplied !== "" && { date_applied: dateApplied }),
      ...(typeof notes === "string" && notes !== "" && { notes }),
    };

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const newApplication = await createApplication(applicationData);

      setApplications((currentApplications) => [
        newApplication,
        ...currentApplications,
      ]);

      form.reset();
      setIsFormOpen(false);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to create application",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className="p-6">Loading applications...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-1 text-gray-500">
            Manage and track all your job applications.
          </p>
        </div>

        <button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setSubmitError(null);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {isFormOpen ? "Close Form" : "+ Add Application"}
        </button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold">Add New Application</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Company</label>
              <input
                name="company"
                required
                className="w-full rounded-lg border p-2"
                placeholder="Google"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Role</label>
              <input
                name="role"
                required
                className="w-full rounded-lg border p-2"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                name="status"
                required
                className="w-full rounded-lg border p-2"
                defaultValue="saved"
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
              <label className="mb-1 block text-sm font-medium">Location</label>
              <input
                name="location"
                className="w-full rounded-lg border p-2"
                placeholder="Kolkata"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Job URL</label>
              <input
                name="job_url"
                type="url"
                className="w-full rounded-lg border p-2"
                placeholder="https://example.com/job"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Date Applied
              </label>
              <input
                name="date_applied"
                type="date"
                className="w-full rounded-lg border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                rows={3}
                className="w-full rounded-lg border p-2"
                placeholder="Add any notes..."
              />
            </div>
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setSubmitError(null);
              }}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Application"}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Company
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Location
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Date Applied
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Job URL
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Notes
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredApplications.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  {searchTerm
                    ? "No applications found matching your search."
                    : "No applications yet. Add your first application."}
                </td>
              </tr>
            ) : (
              filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
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
                            : application.status === "offer"
                              ? "bg-purple-100 text-purple-700"
                              : application.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {application.location || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {application.date_applied
                      ? new Date(application.date_applied).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    {application.job_url ? (
                      <a
                        href={application.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Job
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="max-w-xs whitespace-normal break-words px-6 py-4 text-gray-600">
                    {application.notes || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;
