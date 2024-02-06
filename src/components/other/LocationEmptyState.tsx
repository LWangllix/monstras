import React from "react";
import FishingEmptyState from "../fishing/FishingEmptyState";

const LocationEmptyState = ({ locationError, onClick }) => {
  return (
    <FishingEmptyState
      title={
        locationError === 1
          ? "Nepavyko nustatyti jūsų buvimo vietos."
          : "Jūsų buvimo vietoje nerastas joks vandens telkinys."
      }
      message={
        locationError === 1
          ? `Nueikite į naršyklės nustatymus ir suteikite leidimą rinkti buvimo vietos informaciją. Arba spauskite vietos redagavimo ikoną viršuje ir pasirinkite vietą.`
          : "Spustelėkite mygtuką žemiau ir pabandykite iš naujo nustatyti vietą. Arba spauskite vietos redagavimo ikoną viršuje ir nurodykite vietą."
      }
      onClick={onClick}
      buttonText="Nustatyti buvimo vietą"
    />
  );
};

export default LocationEmptyState;
