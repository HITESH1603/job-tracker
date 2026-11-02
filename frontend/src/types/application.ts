export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export type CreateApplicationInput = {
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string;
  job_url?: string;
  date_applied?: string;
  notes?: string;
};

export type Application = {
  id: number;
  user_id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string | null;
  job_url: string | null;
  date_applied: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

