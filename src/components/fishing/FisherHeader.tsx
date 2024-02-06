import { isBefore, subHours } from "date-fns";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useAlert } from "../../monoCommon/components/Alerts";
import api from "../../server/routers/api";
import {
  CaughtFishOnBoatEventContext,
  FishingStartedContext,
  UserContext,
} from "../../utils/AppContextProvider";
import Dialog from "../other/Dialog";
import Header from "../other/Header";
import FishingDropdown from "./Fishingdropdown";

interface FisherHeaderPropsProps {
  handleClearFilters?: () => void;
}

const FisherHeader = ({ handleClearFilters }: FisherHeaderPropsProps) => {
  const router = useRouter();
  const tab = router.pathname;
  const alert = useAlert();

  const [showStartFishingError, setShowStartFishingError] = useState(false);
  const [locationError, setlocationError] = useState(false);
  const [showForgotToStartFishinhError, setShowForgotToStartFishinhError] =
    useState(false);
  const [errorRoute, setErrorRoute] = useState(null);

  const { setCaughtFishOnBoatEvent, caughtFishOnBoatEvent } = useContext(
    CaughtFishOnBoatEventContext
  );

  const {
    isFreelancer,
    isFreelancerSuspended,
    isTenantUserSuspended,
    isInvestigator,
  } = useContext(UserContext);

  const { fishingStarted, setFishingStarting } = useContext(
    FishingStartedContext
  );

  const handleStartFishing = async () => {
    setFishingStarting(true);
    const showPosition = (position) => {
      api.fishing
        .startFishing({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
        .then((response) => {
          const started = response["created"];
          if (started) {
            alert.show("Žvejybos pradžia užregistruota");

            if (caughtFishOnBoatEvent) {
              setCaughtFishOnBoatEvent(null);
            }
            handleClearFilters && handleClearFilters();
            if (router.pathname !== "/zurnalas") {
              router.push("/zurnalas");
            }
          } else {
            alert.error("Žvejybos pradžios nepavyko užregistruoti");
          }

          setFishingStarting(false);
        });
    };
    const showError = () => {
      setlocationError(true);
      setFishingStarting(false);
    };
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  };

  const handleEndFishing = async () => {
    setFishingStarting(true);

    if (!fishingStarted?.hasFishWeightOnBoat) {
      api.fishing.endFishing({}).then((response) => {
        const started = response["created"];
        if (started) {
          alert.show("Žvejybos pabaiga užregistruota");
          if (caughtFishOnBoatEvent) {
            setCaughtFishOnBoatEvent(null);
          }
          handleClearFilters && handleClearFilters();
          if (router.pathname !== "/zurnalas") {
            router.push("/zurnalas");
          }
        } else {
          alert.error("Nepavyko užregistruoti žvejybos pabaigos");
        }
      });
    } else {
      setShowStartFishingError(true);
    }
    setFishingStarting(false);
  };

  const handleFishWeightOnBoat = () => {
    const fishingTime = new Date(fishingStarted.lastFishingStartTime);
    const dayAgo = subHours(new Date(), 24);
    if (!isBefore(fishingTime, dayAgo)) {
      router.push("/pagauta-zuvis-laive");
    } else {
      setErrorRoute("/pagauta-zuvis-laive");
      setShowForgotToStartFishinhError(true);
    }
  };

  const handleBuildTools = (locationType) => {
    const fishingTime = new Date(fishingStarted.lastFishingStartTime);
    const dayAgo = subHours(new Date(), 24);
    if (!isBefore(fishingTime, dayAgo)) {
      router.push(`/irankiu-statymas?tipas=${locationType}`);
    } else {
      setErrorRoute(`/irankiu-statymas?tipas=${locationType}`);
      setShowForgotToStartFishinhError(true);
    }
  };

  const tabs = [
    {
      route: "/zurnalas",
      label: "Žvejybos žurnalas",
      isSelected: tab === "/zurnalas",
    },
    {
      route: "/irankiai",
      label: "Įrankiai",
      isSelected: tab === "/irankiai",
    },
    {
      route: "/patikrinimo-aktai",
      label: "Patikrinimo aktai",
      isSelected: tab === "/patikrinimo-aktai",
    },
  ];

  if (isInvestigator) {
    tabs.push({
      route: "/moksliniai-tyrimai",
      label: "Moksliniai tyrimai",
      isSelected: tab === "/moksliniai-tyrimai",
    });
  }

  if (!isFreelancer) {
    tabs.push({
      route: "/nariai",
      label: "Įmonės darbuotojai",
      isSelected: tab === "/nariai",
    });
  }

  return (
    <>
      <Header tabs={tabs} showMobileTabs={true} showLabel={true}>
        <FishingDropdown
          onStartFishing={handleStartFishing}
          onFinishFishing={handleEndFishing}
          onWeightOnShore={() => router.push("/pagauta-zuvis-krante")}
          onWeightOnBoat={handleFishWeightOnBoat}
          onBuildTools={handleBuildTools}
          disabled={
            isFreelancer ? isFreelancerSuspended : isTenantUserSuspended
          }
        />
      </Header>
      <Dialog
        show={showStartFishingError}
        title="Sugauta žuvis dar nepasverta"
        message="Prieš baigiant žvejybą būtina pasverti visą sugautą žuvį"
        submitText="Sverti žuvį"
        onSubmit={() => router.push("pagauta-zuvis-krante")}
        onCancel={() => setShowStartFishingError(!showStartFishingError)}
        onClose={() => setShowStartFishingError(false)}
      />
      <Dialog
        show={locationError}
        title="Nenustatyta jūsų buvimo vieta"
        message="Turite leisti gauti jūsų lokaciją, tai galite padaryti nueidami į nustatymus"
        submitText="OK"
        onSubmit={() => setlocationError(false)}
        onClose={() => setlocationError(false)}
      />
      <Dialog
        show={showForgotToStartFishinhError && !showStartFishingError}
        title="Pamiršote baigti žvejybą?"
        message="Paskutinis išplaukimas užregistruotas daugiau nei prieš parą"
        submitText="Baigti žvejybą"
        cancelText="Tęsti"
        onSubmit={handleStartFishing}
        onCancel={() => {
          setShowForgotToStartFishinhError(!showForgotToStartFishinhError);
          router.push(errorRoute);
        }}
        onClose={() => setShowForgotToStartFishinhError(false)}
      />
    </>
  );
};

export default FisherHeader;
