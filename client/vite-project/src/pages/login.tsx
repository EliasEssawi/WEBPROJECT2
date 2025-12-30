import React, { useState } from "react";

import LoginLayout from "../components/login/LoginLayout";
import LoginCard from "../components/login/LoginCard";
import LoginLeftPanel from "../components/login/LoginLeftPanel";
import LoginRightPanel from "../components/login/LoginRightPanel";
import LoginHeader from "../components/login/LoginHeader";
import LoginInput from "../components/login/LoginInput";
import ButtonLogin from "../components/login/ButtonLogin";
import LoginActions from "../components/login/LoginActions";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ usernameOrEmail, password });
  };

  return (
    <LoginLayout>
      <LoginCard>
        {/* LEFT: form */}
        <LoginLeftPanel>
          <LoginHeader />

          <form onSubmit={handleSubmit}>
            <LoginInput
              label="Username or Email"
              placeholder="you@example.com"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              name="usernameOrEmail"
            />

            <LoginInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <ButtonLogin />

            <LoginActions
              onForgotPassword={() => alert("Forgot password feature coming soon")}
              registerHref="/register"
            />
          </form>
        </LoginLeftPanel>

        {/* RIGHT: welcome */}
        <LoginRightPanel />
      </LoginCard>
    </LoginLayout>
  );
}
