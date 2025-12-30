import React from "react";

type Props = {
  onForgotPassword: () => void;
  registerHref?: string;
};

export default function LoginActions({ onForgotPassword, registerHref = "/register" }: Props) {
  return (
    <div className="auth-actions">
      <button type="button" className="btn-link" onClick={onForgotPassword}>
        Forgot password?
      </button>

      <a href={registerHref} className="auth-link">
        Create account →
      </a>
    </div>
  );
}
