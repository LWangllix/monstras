import dynamic from "next/dynamic";
import React from "react";
import { usePermissionChecker } from "../utils/routers";

const ReactAdmin = dynamic(() => import("./../components/AdminApp"), {
  ssr: false,
});

const HomePage = () => {
  const allowed = usePermissionChecker();
  if (!allowed) {
    return null;
  }
  return <ReactAdmin />;
};

export default HomePage;
