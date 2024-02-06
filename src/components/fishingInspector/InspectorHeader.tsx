import { useRouter } from "next/router";
import React from "react";
import Header from "../other/Header";

const InspectorHeader = () => {
  const router = useRouter();
  const tab = router.pathname;

  const tabs = [
    {
      route: "/vidinis",
      label: "Žvejybos žurnalas",
      isSelected: tab === "/vidinis",
    },
    {
      route: "/vidinis/zuvu-istekliu-naudotojai",
      label: "Žuvų išteklių naudotojai",
      isSelected: tab === "/vidinis/zuvu-istekliu-naudotojai",
    },
    {
      route: "/vidinis/protokolai",
      label: "Patikrinimo aktai",
      isSelected: tab === "/vidinis/protokolai",
    },
  ];

  return <Header tabs={tabs} showMobileTabs={true} showLabel={true} />;
};

export default InspectorHeader;
