export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export interface sendVerificationCodeRequest {
  email: string;
}

export interface VerifyCodeRequest{
  email: string;
  code: string;
}

export interface ChangePassRequest{
  email: string;
  code: string;
  newPassword: string;
}