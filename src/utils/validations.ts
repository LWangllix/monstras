import * as emailValidator from "email-validator";
import api from "../server/routers/api";

const validateDate = (date) => {
  if (new Date(date).getTime() < new Date().getTime()) {
    return "Neteisingas laikas";
  }
};

export const validateRegistration = (values) => {
  const errors: Record<string, string> = {};

  if (values.person_type.value !== "individual") {
    if (!values.tenant_code) {
      errors.tenant_code = "Įveskite įmonės kodą";
    }
    if (!values.tenant_name) {
      errors.tenant_name = "Įveskite Įmones pavadinimą";
    }
  }

  if (!values.phone_number) {
    errors.phone_number = "Įveskite telefoną";
  } else if (!/(86|\+3706)\d{7}$/.test(values.phone_number)) {
    errors.phone_number = "Blogas numerio formatas";
  }

  if (!values.email) {
    errors.email = "Įveskite elektroninį paštą";
  } else if (!emailValidator.validate(values.email)) {
    errors.email = "Blogas elektroninio pašto formatas";
  }

  return errors;
};
export const validateToolRegistration = async (values) => {
  const errors: Record<string, string> = {};

  if (!values.type) {
    errors.type = "Pasirinkite tipą";
  }
  if (!values.eye_size) {
    errors.eye_size = "Pasirinkite akių dydį";
  }
  if (!values.net_length) {
    errors.net_length = "Įveskite Tinklaičių ilgį";
  }
  if (!values.seal_nr) {
    errors.seal_nr = "Įveskite plombos nr.";
  } else {
    const tool = await api.tools.existTool({ sealNr: values.seal_nr });
    if (tool["exist"]) {
      errors.seal_nr = "Su tokiu plombos numeriu įrankis egzistuoja";
    }
  }
  return errors;
};

export const validateNewTenant = (values) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Įveskite vadovo vardą";
  }
  if (!values.last_name) {
    errors.last_name = "Įveskite vadovo pavardę";
  }
  if (!values.personal_code) {
    errors.personal_code = "Įveskite vadovo asmens kodą";
  }

  if (!values.phone) {
    errors.phone = "Įveskite vadovo numerį";
  } else if (!/(86|\+3706)\d{7}$/.test(values.phone)) {
    errors.phone = "Blogas numerio formatas";
  }
  if (!values.email) {
    errors.email = "Įveskite vadovo elektroninį paštą";
  } else if (!emailValidator.validate(values.email)) {
    errors.email = "Blogas elektroninio pašto formatas";
  }
  if (values.person_type.value == "tenant") {
    if (!values.tenant_name) {
      errors.tenant_name = "Įveskite įmonės pavadinimą";
    }
    if (!values.tenant_code) {
      errors.tenant_code = "Įveskite įmonės kodą";
    }
    if (!values.address) {
      errors.address = "Įveskite įmonės adresą";
    }
  }

  return errors;
};

export const validUpdateUser = (values) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Įveskite  vardą";
  }
  if (!values.last_name) {
    errors.last_name = "Įveskite  pavardę";
  }
  if (!values.personal_code) {
    errors.personal_code = "Įveskite  asmens kodą";
  }
  if (!values.phone) {
    errors.phone = "Įveskite numerį";
  } else if (!/(86|\+3706)\d{7}$/.test(values.phone)) {
    errors.phone = "Blogas numerio formatas";
  }
  if (!values.email) {
    errors.email = "Įveskite elektroninį paštą";
  } else if (!emailValidator.validate(values.email)) {
    errors.email = "Blogas elektroninio pašto formatas";
  }

  return errors;
};

export const validUpdateTenant = (values) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Įveskite įmonės pavadinimą";
  }
  if (!values.code) {
    errors.code = "Įveskite įmonės kodą";
  }
  if (!values.address) {
    errors.address = "Įveskite įmonės adresą";
  }
  if (!values.owner) {
    errors.phone = "Pasirinkite vadovą";
  }

  return errors;
};

export const validateInvestigationForm = (values) => {
  const errors: Record<string, string> = {};

  if (!values.municipality?.id || !values.municipality) {
    errors.municipality = "Pasirinkite savivaldybę";
  }
  if (!values.water_body?.id || !values.water_body) {
    errors.water_body = "Pasirinkite vandens telkinį";
  }
  if (!values.water_body_code) {
    errors.water_body_code = "Įveskite vandens telkinio kodą";
  }
  if (!values.water_body_area) {
    errors.water_body_area = "Įveskite vandens telkinio plotą";
  }
  if (!values.date_from) {
    errors.date_from = "Pasirinkite datą";
  }
  if (!values.date_to) {
    errors.date_to = "Pasirinkite datą";
  }

  const protocolFishes = validateInvestifationlFish(values.fishes);
  if (protocolFishes) {
    errors.fishes = protocolFishes;
  }
  if (!values.predatory_fish_abundance) {
    errors.predatory_fish_abundance = "Įveskite plėšrių žuvų gausumą";
  }
  if (!values.predatory_fish_biomass) {
    errors.predatory_fish_biomass = "Įveskite plėšrių žuvų biomasę";
  }

  if (!values.average_individual_weight) {
    errors.average_individual_weight = "Įveskite vidutinį individo svorį";
  }
  if (!values.valuable_fish_biomass) {
    errors.valuable_fish_biomass = "Įveskite vertingų žuvų biomasę";
  }
  if (!values.resources_index) {
    errors.resources_index = "Įveskite šaltinio indeksą";
  }

  if (
    values?.file &&
    values?.file?.type !== "application/pdf" &&
    values?.file?.name?.split(".")?.pop() !== "pdf"
  ) {
    errors.file = "Leistini tik pdf failai";
  }

  return errors;
};

export const validateInvestifationlFish = (fishes) => {
  let isInvalid = false;
  const errors = fishes.map((f) => {
    if (
      !f.type ||
      !f.abundance ||
      !f.total_abundance_percent ||
      !f.biomass ||
      !f.total_biomass_percent
    ) {
      isInvalid = true;
    }

    return {
      type: !f.type ? "Privalomas laukas" : "",
      abundance: !f.abundance ? "Privalomas laukas" : "",
      total_abundance_percent: !f.total_abundance_percent
        ? "Privalomas laukas"
        : "",
      biomass: !f.biomass ? "Privalomas laukas" : "",
      total_biomass_percent: !f.total_biomass_percent
        ? "Privalomas laukas"
        : "",
    };
  });

  if (isInvalid) {
    return errors;
  }
};

export const validateProtocol = (values) => {
  const errors: Record<string, string> = {};

  if (!values.municipality?.name || !values.municipality) {
    errors.municipality = "Pasirinkite savivaldybę";
  }
  if (!values.user?.full_name) {
    errors.user = "Pasirinkite žveją";
  }
  if (!values.census_location) {
    errors.census_location = "Įveskite surašymo vietą";
  }
  if (values.water_object_type.value === "baras") {
    if (!values.water_body?.name) {
      errors.water_body = "Įveskite baro  pavadinimą";
    }
  } else {
    if (!values.river_or_lake?.name) {
      errors.river_or_lake = "Įveskite telkinio pavadinimą";
    }
  }

  if (!values.documentation_check.value) {
    errors.documentation_check = "Pasirinkite vieną iš pasirinkimų";
  }

  if (!values.place_of_inspection.value) {
    errors.place_of_inspection = "Pasirinkite vieną iš pasirinkimų";
  }

  if (!values.tools_check.value) {
    errors.tools_check = "Pasirinkite vieną iš pasirinkimų";
  }
  if (values.tools_check.value === "true") {
    if (!values.tools_infringement.value) {
      errors.tools_infringement = "Pasirinkite vieną iš pasirinkimų";
    }
  }

  if (!values.fishing_catch_check.value) {
    errors.fishing_catch_check = "Pasirinkite vieną iš pasirinkimų";
  }
  if (values.fishing_catch_check.value === "true") {
    if (!values.fishing_catch_infringement.value) {
      errors.fishing_catch_infringement = "Pasirinkite vieną iš pasirinkimų";
    }
    const protocolFishes = validateProtocolFish(values.fishes);
    if (protocolFishes) {
      errors.fishes = protocolFishes;
    }
    if (!values.side_fishes_catch_type) {
      errors.side_fishes_catch_type = "pasirinkite tipą";
    }
    if (!values.side_fishing_catch) {
      errors.side_fishing_catch = "Įveskite šalutinį žvejybos laimikį";
    }
  }

  if (!values.during_the_inspection.value) {
    errors.during_the_inspection = "Pasirinkite vieną iš pasirinkimų";
  }
  if (values.during_the_inspection.value === "true") {
    if (!values.comment) {
      errors.comment = "Suveskite punktus";
    }
  }

  return errors;
};

export const validateProtocolFish = (fishes) => {
  let isInvalid = false;
  const validateFormat = /^\d*[\/]+\d+[\.\,]?\d*$/;
  const errors = fishes.map((f) => {
    if (
      !f.type ||
      !f.amount ||
      !f.business_size ||
      !validateFormat.test(f.stored_fish_amount) ||
      !f.side_fishing_catch
    ) {
      isInvalid = true;
    }

    return {
      type: !f.type ? "Privalomas laukas" : "",
      amount: !f.amount ? "Privalomas laukas" : "",
      business_size: !f.business_size ? "Privalomas laukas" : "",
      side_fishing_catch: !f.side_fishing_catch ? "Privalomas laukas" : "",
      stored_fish_amount: !validateFormat.test(f.stored_fish_amount)
        ? "Privalomas laukas"
        : "",
    };
  });

  if (isInvalid) {
    return errors;
  }
};

export const validateToolUpdate = (values) => {
  const errors: Record<string, string> = {};

  if (!values.eye_size) {
    errors.eye_size = "Pasirinkite akių dydį";
  }
  if (!values.net_length) {
    errors.net_length = "Įveskite Tinklaičių ilgį";
  }
  if (!values.seal_nr) {
    errors.seal_nr = "Įveskite plombos nr.";
  }

  return errors;
};

export const validateFish = (values) => {
  let isInvalid = false;

  const errors = {};

  values.fishes.forEach((f) => {
    if (!f.type?.id || !f.weight) {
      isInvalid = true;
    }
    errors[f.type.id] = {
      type: !f.type?.id ? "Privalomas laukas" : null,
      weight: !f.weight ? "Privalomas laukas" : null,
    };
  });

  if (isInvalid) {
    return errors;
  }
};

export const validateFishWeight = (values) => {
  let isInvalid = false;
  const errors = {};

  values.fishes.forEach((f) => {
    if (!f.weight) {
      isInvalid = true;
    }
    errors[f.id] = {
      weight: !f.weight ? "Privalomas laukas" : null,
    };
  });
  if (isInvalid) {
    return errors;
  }
};
