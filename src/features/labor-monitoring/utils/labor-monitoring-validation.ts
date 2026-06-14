import type {
  LaborMonitoringFormErrors,
  LaborMonitoringFormValues,
} from "../types/labor-monitoring.type";

function isNumberInRange(value: number, minimum: number, maximum: number) {
  return Number.isFinite(value) && value >= minimum && value <= maximum;
}

export function validateLaborMonitoringForm(
  values: LaborMonitoringFormValues,
): LaborMonitoringFormErrors {
  const errors: LaborMonitoringFormErrors = {};

  if (!values.recordedAt) {
    errors.recordedAt = "Tanggal dan jam pemantauan wajib diisi.";
  } else {
    const recordedDate = new Date(values.recordedAt);

    if (Number.isNaN(recordedDate.getTime())) {
      errors.recordedAt = "Tanggal dan jam pemantauan tidak valid.";
    }
  }

  if (!isNumberInRange(values.vitalSigns.systolicBloodPressure, 60, 250)) {
    errors["vitalSigns.systolicBloodPressure"] =
      "Sistolik harus berada pada rentang 60–250 mmHg.";
  }

  if (!isNumberInRange(values.vitalSigns.diastolicBloodPressure, 30, 150)) {
    errors["vitalSigns.diastolicBloodPressure"] =
      "Diastolik harus berada pada rentang 30–150 mmHg.";
  }

  if (
    values.vitalSigns.diastolicBloodPressure >=
    values.vitalSigns.systolicBloodPressure
  ) {
    errors["vitalSigns.diastolicBloodPressure"] =
      "Diastolik harus lebih kecil dari sistolik.";
  }

  if (!isNumberInRange(values.vitalSigns.pulse, 30, 220)) {
    errors["vitalSigns.pulse"] =
      "Nadi harus berada pada rentang 30–220 kali per menit.";
  }

  if (!isNumberInRange(values.vitalSigns.respiratoryRate, 8, 60)) {
    errors["vitalSigns.respiratoryRate"] =
      "Napas harus berada pada rentang 8–60 kali per menit.";
  }

  if (!isNumberInRange(values.vitalSigns.temperature, 30, 45)) {
    errors["vitalSigns.temperature"] =
      "Suhu harus berada pada rentang 30–45 °C.";
  }

  if (!isNumberInRange(values.vitalSigns.oxygenSaturation, 50, 100)) {
    errors["vitalSigns.oxygenSaturation"] =
      "Saturasi oksigen harus berada pada rentang 50–100%.";
  }

  if (!isNumberInRange(values.fetalHeartRate, 60, 220)) {
    errors.fetalHeartRate =
      "DJJ harus berada pada rentang 60–220 kali per menit.";
  }

  if (!values.fetalMovement) {
    errors.fetalMovement = "Status gerak janin wajib dipilih.";
  }

  if (!isNumberInRange(values.contractions.frequencyPer10Minutes, 0, 10)) {
    errors["contractions.frequencyPer10Minutes"] =
      "Frekuensi kontraksi harus berada pada rentang 0–10 per 10 menit.";
  }

  if (!isNumberInRange(values.contractions.durationSeconds, 0, 180)) {
    errors["contractions.durationSeconds"] =
      "Durasi kontraksi harus berada pada rentang 0–180 detik.";
  }

  if (!values.contractions.intensity) {
    errors["contractions.intensity"] = "Intensitas kontraksi wajib dipilih.";
  }

  if (!isNumberInRange(values.cervicalDilationCm, 0, 10)) {
    errors.cervicalDilationCm =
      "Pembukaan serviks harus berada pada rentang 0–10 cm.";
  }

  if (!values.headDescent) {
    errors.headDescent = "Penurunan kepala wajib dipilih.";
  }

  if (!values.membranes.status) {
    errors["membranes.status"] = "Status ketuban wajib dipilih.";
  }

  if (values.membranes.status === "ruptured") {
    if (!values.membranes.rupturedAt) {
      errors["membranes.rupturedAt"] = "Jam pecah ketuban wajib diisi.";
    }

    if (!values.membranes.color) {
      errors["membranes.color"] = "Warna air ketuban wajib dipilih.";
    }
  }

  if (!isNumberInRange(values.urine.volumeMl, 0, 3000)) {
    errors["urine.volumeMl"] =
      "Volume urine harus berada pada rentang 0–3000 ml.";
  }

  if (!values.urine.protein) {
    errors["urine.protein"] = "Hasil protein urine wajib dipilih.";
  }

  if (!values.urine.acetone) {
    errors["urine.acetone"] = "Hasil aseton urine wajib dipilih.";
  }

  return errors;
}

export function hasLaborMonitoringFormErrors(
  errors: LaborMonitoringFormErrors,
) {
  return Object.keys(errors).length > 0;
}
