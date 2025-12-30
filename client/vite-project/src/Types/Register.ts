export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  pin: string;
  dateOfBirth: string; // ISO string (yyyy-mm-dd)
}

export interface RegisterResponse {
  message: string;
}
