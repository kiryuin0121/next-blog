import PrivateHeader from "@/components/layouts/PrivateHeader";
import React from "react";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PrivateHeader />
      {children}
    </div>
  );
};

export default PrivateLayout;
