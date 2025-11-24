export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export class AuthService {
  private baseUrl = "http://localhost:8000";

  async login(credentials: LoginData): Promise<User> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }

    return response.json();
  }

  storeUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  clearStoredUser(): void {
    localStorage.removeItem("user");
  }

  isAuthenticated(): boolean {
    return this.getStoredUser() !== null;
  }
}

export const authService = new AuthService();