import type {
  DeliveryOutcomeFormErrors,
  DeliveryOutcomeFormValues,
} from "../types/delivery-outcome.type";

export function validateDeliveryOutcomeForm(
  values: DeliveryOutcomeFormValues,
): DeliveryOutcomeFormErrors {
  const errors: DeliveryOutcomeFormErrors = {};

  if (!values.outcomeType) {
    errors.outcomeType = "Pilih salah satu luaran persalinan.";
  }

  return errors;
}

export function hasDeliveryOutcomeFormErrors(
  errors: DeliveryOutcomeFormErrors,
) {
  return Object.keys(errors).length > 0;
}
