import apiRequest from "./api";
import type {
  Application,
  ApplicationStats,
  CreateApplicationInput,
} from "../types/application";

export type ApplicationQueryParams = {
  search?: string;
  status?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
};

export type PaginatedApplications = {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getApplicationStats(): Promise<ApplicationStats> {
  return apiRequest("/applications/stats");
}

export async function getApplications(
  params: ApplicationQueryParams = {},
): Promise<PaginatedApplications> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  return apiRequest(
    queryString ? `/applications?${queryString}` : "/applications",
  );
}

export async function createApplication(
  input: CreateApplicationInput,
): Promise<Application> {
  return apiRequest("/applications", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateApplication(
  id: number,
  input: Partial<CreateApplicationInput>,
): Promise<Application> {
  return apiRequest(`/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteApplication(id: number): Promise<null> {
  return apiRequest(`/applications/${id}`, {
    method: "DELETE",
  });
}
