import React from "react";

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function ButtonLogin({ children = "Login", disabled = false }: Props) {
  return (
    <button type="submit" disabled={disabled} className="btn btn-primary">
      {children}
    </button>
  );
}
