import apiRequest from "./api";
import type {
  Application,
  ApplicationStats,
  CreateApplicationInput,
} from "../types/application";

export async function getApplicationStats(): Promise<ApplicationStats> {
  return apiRequest("/applications/stats");
}

export async function getApplications(): Promise<Application[]> {
  return apiRequest("/applications");
}

export async function createApplication(
  input: CreateApplicationInput,
): Promise<Application> {
  return apiRequest("/applications", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
