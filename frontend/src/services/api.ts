
const API_BASE_URL = "http://localhost:3000";

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    const validationErrors = data.errors;

    if (validationErrors && typeof validationErrors === "object") {
      const messages = Object.values(validationErrors).flat();

      if (messages.length > 0) {
        throw new Error(messages.join(". "));
      }
    }

    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export default apiRequest;
