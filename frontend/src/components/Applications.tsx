import { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";
import type {
  Application,
  CreateApplicationInput,
  ApplicationStatus,
} from "../types/application";

function isApplicationStatus(value: string): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
}

function getOptionalValue(value: FormDataEntryValue | null): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

const APPLICATION_STATUSES = [
  "saved",
  "applied",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
] as const;

function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadApplications() {
      try {
        setError(null);
        const data = await getApplications({
          search: searchTerm,
          status: statusFilter,
          sortBy: sortBy,
          order: sortOrder,
          page: currentPage,
          limit: 10,
        });
        if (ignore) return;
        setApplications(data.applications);
        setTotalPages(data.totalPages);
      } catch (err) {
        if (ignore) return;
        setError(
          err instanceof Error ? err.message : "Failed to load applications",
        );
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      ignore = true;
    };
  }, [searchTerm, statusFilter, sortBy, sortOrder, currentPage, refreshKey]);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const company = formData.get("company");
    const role = formData.get("role");
    const status = formData.get("status");

    if (
      typeof company !== "string" ||
      typeof role !== "string" ||
      typeof status !== "string"
    ) {
      return;
    }

    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();

    setSubmitError(null);

    if (!trimmedCompany || !trimmedRole) {
      setSubmitError("Company and role cannot be empty.");
      return;
    }
    if (!isApplicationStatus(status)) {
      return;
    }

    const applicationData: CreateApplicationInput = {
      company: trimmedCompany,
      role: trimmedRole,
      status,
      location: getOptionalValue(formData.get("location")),
      job_url: getOptionalValue(formData.get("job_url")),
      date_applied: getOptionalValue(formData.get("date_applied")),
      notes: getOptionalValue(formData.get("notes")),
    };

    const applicationToEdit = editingApplication;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      if (applicationToEdit) {
        await updateApplication(applicationToEdit.id, applicationData);

        setRefreshKey((k) => k + 1);
      } else {
        await createApplication(applicationData);
        setRefreshKey((k) => k + 1);
      }

      form.reset();
      setEditingApplication(null);
      setIsFormOpen(false);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : applicationToEdit
            ? "Failed to update application"
            : "Failed to create application",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(application: Application) {
    setEditingApplication(application);
    setIsFormOpen(true);
    setSubmitError(null);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);

      if (applications.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setRefreshKey((k) => k + 1);
      }
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to delete application",
      );
    }
  }

  if (isLoading) {
    return <p className="p-6">Loading applications...</p>;
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
            if (isFormOpen) {
              setIsFormOpen(false);
              setEditingApplication(null);
            } else {
              setEditingApplication(null);
              setIsFormOpen(true);
            }

            setSubmitError(null);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {isFormOpen ? "Close Form" : "+ Add Application"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      {isFormOpen && (
        <form
          key={editingApplication?.id ?? "new"}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold">
            {editingApplication ? "Edit Application" : "Add New Application"}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="mb-1 block text-sm font-medium"
              >
                Company
              </label>

              <input
                id="company"
                name="company"
                required
                defaultValue={editingApplication?.company ?? ""}
                className="w-full rounded-lg border p-2"
                placeholder="Google"
              />
            </div>

            <div>
              <label htmlFor="role" className="mb-1 block text-sm font-medium">
                Role
              </label>
              <input
                id="role"
                name="role"
                required
                defaultValue={editingApplication?.role ?? ""}
                className="w-full rounded-lg border p-2"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                required
                className="w-full rounded-lg border p-2"
                defaultValue={editingApplication?.status ?? "saved"}
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-1 block text-sm font-medium"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                defaultValue={editingApplication?.location ?? ""}
                className="w-full rounded-lg border p-2"
                placeholder="Kolkata"
              />
            </div>

            <div>
              <label
                htmlFor="job_url"
                className="mb-1 block text-sm font-medium"
              >
                Job URL
              </label>
              <input
                id="job_url"
                name="job_url"
                type="url"
                defaultValue={editingApplication?.job_url ?? ""}
                className="w-full rounded-lg border p-2"
                placeholder="https://example.com/job"
              />
            </div>

            <div>
              <label
                htmlFor="date_applied"
                className="mb-1 block text-sm font-medium"
              >
                Date Applied
              </label>
              <input
                id="date_applied"
                name="date_applied"
                type="date"
                defaultValue={
                  editingApplication?.date_applied?.slice(0, 10) ?? ""
                }
                className="w-full rounded-lg border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="notes" className="mb-1 block text-sm font-medium">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                defaultValue={editingApplication?.notes ?? ""}
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
                setEditingApplication(null);
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
              {isSubmitting
                ? "Saving..."
                : editingApplication
                  ? "Update Application"
                  : "Save Application"}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm md:flex-row">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500 md:flex-1"
        />

        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">All statuses</option>

          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={`${sortBy}:${sortOrder}`}
          onChange={(event) => {
            const [newSortBy, newSortOrder] = event.target.value.split(":");

            if (newSortBy && newSortOrder) {
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
              setCurrentPage(1);
            }
          }}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="created_at:desc">Newest first</option>
          <option value="created_at:asc">Oldest first</option>
          <option value="company:asc">Company (A-Z)</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full min-w-[1100px] text-left">
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
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  {error
                    ? "Could not load applications."
                    : searchTerm || statusFilter
                      ? "No applications found matching your search."
                      : "No applications yet. Add your first application."}
                </td>
              </tr>
            ) : (
              applications.map((application) => (
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
                      ? new Date(application.date_applied).toLocaleDateString(
                          "en-IN",
                          {
                            timeZone: "UTC",
                          },
                        )
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

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(application)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(application.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Applications;
