import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FisherHeader from "../components/fishing/FisherHeader";
import DefaultLayout from "../monoCommon/components/layouts/DefaultLayout";
import FishingMap from "../components/map/FishingMap";
import NewToolForm from "../components/tools/NewToolForm";
import api from "../server/routers/api";
import { device } from "../styles";
import { UserContext } from "../utils/AppContextProvider";
import { usePermissionChecker } from "../utils/routers";
import { ToolType } from "../server/models/ToolType";
import { useAlert } from "../monoCommon/components/Alerts";

const NewEquipment = () => {
  const allowed = usePermissionChecker();
  if (!allowed) {
    return null;
  }
  const { user } = React.useContext(UserContext);
  const [mapFocused, setMapFocused] = useState(false);
  const [toolTypes, setToolTypes] = useState<Array<ToolType>>([]);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    api.toolType.list({}).then((response) => setToolTypes(response["result"]));
  }, []);

  const handleSubmit = (values) => {
    if (user.user) {
      api.tools
        .createTool({
          type_id: values.type.id,
          eye_size: values.eye_size,
          net_length: values.net_length,
          seal_nr: values.seal_nr,
        })
        .then((response) => {
          const created = response["tool"];
          if (created) {
            alert.show("Naujas įrankis pridėtas");
            router.push("/irankiai");
          } else {
            alert.error("Nepavyko pridėti įrankio");
          }
        });
    }
  };

  return (
    <DefaultLayout
      mapFocused={mapFocused}
      onMapModalClose={setMapFocused}
      renderMap={<FishingMap />}
      navBar={<FisherHeader />}
    >
      <Container>
        <Title>Naujas žvejybos įrankis</Title>
        <NewToolForm onSubmit={handleSubmit} toolTypes={toolTypes} />
      </Container>
    </DefaultLayout>
  );
};

const Title = styled.div`
  font: normal normal bold 32px/40px Manrope;
  letter-spacing: 0px;
  color: #121a55;
  margin: 40px 0px 48px 0px;
`;

const Container = styled.div`
  margin: 0 32px;
  height: calc(100% - 118px);
  display: flex;
  flex-direction: column;
  @media ${device.mobileL} {
    margin: 0 16px;
  }
`;

export default NewEquipment;
