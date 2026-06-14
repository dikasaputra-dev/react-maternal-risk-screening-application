import type {
  NewbornOutcomeFormErrors,
  NewbornOutcomeFormValues,
} from "../types/newborn-outcome.type";

export function validateNewbornOutcomeForm(
  values: NewbornOutcomeFormValues,
): NewbornOutcomeFormErrors {
  const errors: NewbornOutcomeFormErrors = {};

  if (!values.outcomeType) {
    errors.outcomeType = "Pilih salah satu luaran kelahiran bayi.";

    return errors;
  }

  if (values.outcomeType === "apgar") {
    if (values.apgarScore === "") {
      errors.apgarScore = "APGAR Score wajib diisi.";
    } else if (!Number.isInteger(values.apgarScore)) {
      errors.apgarScore = "APGAR Score harus berupa bilangan bulat.";
    } else if (values.apgarScore < 0 || values.apgarScore > 10) {
      errors.apgarScore = "APGAR Score harus berada pada skala 0–10.";
    }
  }

  return errors;
}

export function hasNewbornOutcomeFormErrors(errors: NewbornOutcomeFormErrors) {
  return Object.keys(errors).length > 0;
}
