import type {
  ClinicalActionFieldName,
  ClinicalActionFormErrors,
  ClinicalActionFormValues,
} from "../types/clinical-action.type";

function setLaboratoryError(
  errors: ClinicalActionFormErrors,
  index: number,
  field: "examinationDate" | "specimen" | "result",
  message: string,
) {
  const key = `laboratoryResults.${index}.${field}` as ClinicalActionFieldName;

  errors[key] = message;
}

export function validateClinicalActionForm(
  values: ClinicalActionFormValues,
): ClinicalActionFormErrors {
  const errors: ClinicalActionFormErrors = {};

  if (!values.recordedAt) {
    errors.recordedAt = "Tanggal dan jam tindakan wajib diisi.";
  } else {
    const recordedDate = new Date(values.recordedAt);

    if (Number.isNaN(recordedDate.getTime())) {
      errors.recordedAt = "Tanggal dan jam tindakan tidak valid.";
    }
  }

  if (values.selectedMedicationFluidTypes.length === 0) {
    errors.selectedMedicationFluidTypes =
      "Pilih minimal satu obat atau cairan.";
  }

  if (
    values.selectedMedicationFluidTypes.includes("none") &&
    values.selectedMedicationFluidTypes.length > 1
  ) {
    errors.selectedMedicationFluidTypes =
      "Pilihan Tidak Ada tidak dapat digabungkan dengan obat atau cairan lain.";
  }

  if (values.selectedMedicationFluidTypes.includes("oxytocin_drip")) {
    if (
      !Number.isFinite(values.oxytocinUnits) ||
      values.oxytocinUnits <= 0 ||
      values.oxytocinUnits > 100
    ) {
      errors.oxytocinUnits =
        "Dosis oksitosin harus berada pada rentang 1–100 UI.";
    }
  }

  if (!values.clinicalDecision.type) {
    errors["clinicalDecision.type"] = "Keputusan klinis wajib dipilih.";
  }

  if (values.clinicalDecision.type === "procedure") {
    const description = values.clinicalDecision.description.trim();

    if (!description) {
      errors["clinicalDecision.description"] =
        "Deskripsi tindakan wajib diisi.";
    } else if (description.length < 3) {
      errors["clinicalDecision.description"] =
        "Deskripsi tindakan minimal 3 karakter.";
    } else if (description.length > 1000) {
      errors["clinicalDecision.description"] =
        "Deskripsi tindakan maksimal 1000 karakter.";
    }
  }

  values.laboratoryResults.forEach((laboratoryResult, index) => {
    const examinationDate = laboratoryResult.examinationDate;
    const specimen = laboratoryResult.specimen.trim();
    const result = laboratoryResult.result.trim();

    if (!examinationDate) {
      setLaboratoryError(
        errors,
        index,
        "examinationDate",
        "Tanggal pemeriksaan wajib diisi.",
      );
    }

    if (!specimen) {
      setLaboratoryError(errors, index, "specimen", "Spesimen wajib diisi.");
    } else if (specimen.length > 255) {
      setLaboratoryError(
        errors,
        index,
        "specimen",
        "Spesimen maksimal 255 karakter.",
      );
    }

    if (!result) {
      setLaboratoryError(
        errors,
        index,
        "result",
        "Hasil laboratorium wajib diisi.",
      );
    } else if (result.length > 2000) {
      setLaboratoryError(
        errors,
        index,
        "result",
        "Hasil laboratorium maksimal 2000 karakter.",
      );
    }
  });

  return errors;
}

export function hasClinicalActionFormErrors(errors: ClinicalActionFormErrors) {
  return Object.keys(errors).length > 0;
}
