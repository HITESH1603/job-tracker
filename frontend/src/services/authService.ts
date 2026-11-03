import apiRequest from "./api";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(input: RegisterInput) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

  sessionStorage.setItem("token", data.token);

  return data;
}