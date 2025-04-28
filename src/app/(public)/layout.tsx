import PublicHeader from "@/components/layouts/PublicHeader";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
};

export default PublicLayout;
