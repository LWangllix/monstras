import React, { useContext } from "react";
import FisherHeader from "../components/fishing/FisherHeader";
import { UserContext } from "../utils/AppContextProvider";
const EquipmentReturn = () => {
  const { isFreelancer, isTenantOwner, isTenantWorker } =
    useContext(UserContext);

  return (
    <>
      <FisherHeader />
      <div>{isFreelancer && <div> Freelancerio divas</div>}</div>
      {isTenantOwner && <div> tenant ownerio</div>}
      {isTenantWorker && <div>Paprastas vartotojas tenante</div>}
    </>
  );
};
export default EquipmentReturn;
