export const EVENT_TYPES = {
  FishWeightOnBoat: "fishWeightOnBoat",
  FishWeightOnShore: "fishWeightOnShore",
  FishingStarted: "startFishing",
  FishingEnded: "endFishing",
  FishingToolsBuilt: "builtTools",
};

export const currentPage = {
  fishWeightOnBoat: "Pagauta žuvis laive",
  fishWeightOnShore: "Pagauta žuvis krante",
  builtTools: "Įrankių statymas",
  tool: "Įrankis",
  tenant: "Įmonė",
  user: "Darbuotojas",
};

export const fishingStatesLabels = {
  builtTools: "Stato įrankius",
  startFishing: "Pradėta žvejyba",
  fishWeightOnShore: "Žuvų iškrovimas",
  fishWeightOnBoat: "žvejoja",
  endFishing: "Baigta žvejyba",
};

export const personTypes = {
  individual: {
    value: "individual",
    label: "Fizinis asmuo",
  },
  legalPerson: {
    value: "legal_person",
    label: "Juridinis asmuo",
  },
};

export const PlaceOfInspection = {
  fishingPlace: {
    label: "Žvejybos vietoje",
    value: "fishingPlace",
  },
  unloadPlace: {
    label: "Žuvų iškrovimo vietoje",
    value: "unloadPlace",
  },

  otherPlace: {
    label: "Kita vieta",
    value: "otherPlace",
  },
};

export const DuringTheInspection = {
  no: {
    label: "Pažeidimų nėra",
    value: "false",
  },
  yes: {
    label: "Pažeidimų yra",
    value: "true",
  },
};

export const AllowedFishFishing = {
  various: {
    label: "Įvairiu žuvų žvejyba",
    value: "various",
  },
  specialized: {
    label: "Specializuota žuvų žvejyba",
    value: "specialized",
  },
};

export const Infringement = {
  yes: {
    label: "Taip",
    value: "true",
  },
  no: {
    label: "Ne",
    value: "false",
  },
};

export const Check = {
  yes: {
    label: "Taip",
    value: "true",
  },
  no: {
    label: "Ne",
    value: "false",
  },
};
export const waterObjectType = {
  baras: {
    label: "Kuršių marios",
    value: "baras",
  },
  other: {
    label: "Vidaus vandens telkinys",
    value: "other",
  },
  polder: {
    label: "Polderiai",
    value: "polder",
  },
};
export const addPersonTypes = {
  tenant: {
    value: "tenant",
    label: "Įmone",
  },
  individual: {
    value: "individual",
    label: "Individuali veikla",
  },
};
