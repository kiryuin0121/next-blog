import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
