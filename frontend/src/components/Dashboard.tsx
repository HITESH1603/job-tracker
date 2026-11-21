import { BriefcaseBusiness, Video, Trophy, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Application, ApplicationStats } from "../types/application";
import {
  getApplicationStats,
  getApplications,
} from "../services/applicationService";

function Dashboard() {
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<Application[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, applicationsData] = await Promise.all([
          getApplicationStats(),
          getApplications(),
        ]);

        setStats(statsData);
        setRecentApplications(applicationsData.applications.slice(0, 3));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const statsCards = stats
    ? [
        {
          label: "Total Applications",
          value: stats.total,
          icon: BriefcaseBusiness,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          label: "Interviews",
          value: stats.byStatus.interview,
          icon: Video,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
        {
          label: "Offers",
          value: stats.byStatus.offer,
          icon: Trophy,
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
        {
          label: "Rejected",
          value: stats.byStatus.rejected,
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100",
        },
      ]
    : [];

  const statusStyles: Record<string, string> = {
    applied: "bg-blue-100 text-blue-700",
    interview: "bg-purple-100 text-purple-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Track and manage your job applications.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <Icon size={24} className={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-semibold">Recent Applications</h2>
          <Link
            to="/applications"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p className="p-5 text-gray-500">
            No applications yet. Start by adding your first application.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Position</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Applied Date</th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((application) => (
                  <tr key={application.id} className="border-t">
                    <td className="p-4 font-medium">{application.company}</td>
                    <td className="p-4">{application.role}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          statusStyles[application.status] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {application.date_applied
                        ? new Date(application.date_applied).toLocaleDateString(
                            "en-IN",
                            {
                              timeZone: "UTC",
                            },
                          )
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
