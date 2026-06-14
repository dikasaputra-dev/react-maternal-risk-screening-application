import type {
  InitialScreeningFormErrors,
  InitialScreeningFormValues,
} from "../types/initial-screening.type";

function isNumberInRange(value: number, minimum: number, maximum: number) {
  return Number.isFinite(value) && value >= minimum && value <= maximum;
}

export function validateInitialScreeningForm(
  values: InitialScreeningFormValues,
): InitialScreeningFormErrors {
  const errors: InitialScreeningFormErrors = {};

  if (!isNumberInRange(values.heightCm, 100, 220)) {
    errors.heightCm = "Tinggi badan harus berada pada rentang 100–220 cm.";
  }

  if (!values.vitalSigns.consciousness) {
    errors["vitalSigns.consciousness"] = "Tingkat kesadaran wajib dipilih.";
  }

  if (!isNumberInRange(values.vitalSigns.systolicBloodPressure, 60, 250)) {
    errors["vitalSigns.systolicBloodPressure"] =
      "Tekanan darah sistolik harus berada pada rentang 60–250 mmHg.";
  }

  if (!isNumberInRange(values.vitalSigns.diastolicBloodPressure, 30, 150)) {
    errors["vitalSigns.diastolicBloodPressure"] =
      "Tekanan darah diastolik harus berada pada rentang 30–150 mmHg.";
  }

  if (
    values.vitalSigns.diastolicBloodPressure >=
    values.vitalSigns.systolicBloodPressure
  ) {
    errors["vitalSigns.diastolicBloodPressure"] =
      "Tekanan darah diastolik harus lebih kecil dari sistolik.";
  }

  if (!isNumberInRange(values.vitalSigns.pulse, 30, 220)) {
    errors["vitalSigns.pulse"] =
      "Nadi harus berada pada rentang 30–220 kali per menit.";
  }

  if (!isNumberInRange(values.vitalSigns.respiratoryRate, 8, 60)) {
    errors["vitalSigns.respiratoryRate"] =
      "Frekuensi napas harus berada pada rentang 8–60 kali per menit.";
  }

  if (!isNumberInRange(values.vitalSigns.temperature, 30, 45)) {
    errors["vitalSigns.temperature"] =
      "Suhu harus berada pada rentang 30–45 °C.";
  }

  if (!isNumberInRange(values.vitalSigns.oxygenSaturation, 50, 100)) {
    errors["vitalSigns.oxygenSaturation"] =
      "Saturasi oksigen harus berada pada rentang 50–100%.";
  }

  if (!isNumberInRange(values.obstetricStatus.gravida, 1, 20)) {
    errors["obstetricStatus.gravida"] =
      "Gravida harus berada pada rentang 1–20.";
  }

  if (!isNumberInRange(values.obstetricStatus.para, 0, 20)) {
    errors["obstetricStatus.para"] = "Para harus berada pada rentang 0–20.";
  }

  if (!isNumberInRange(values.obstetricStatus.abortus, 0, 20)) {
    errors["obstetricStatus.abortus"] =
      "Abortus harus berada pada rentang 0–20.";
  }

  if (!isNumberInRange(values.obstetricStatus.livingChildren, 0, 20)) {
    errors["obstetricStatus.livingChildren"] =
      "Jumlah anak hidup harus berada pada rentang 0–20.";
  }

  if (
    values.obstetricStatus.para + values.obstetricStatus.abortus >
    values.obstetricStatus.gravida - 1
  ) {
    errors["obstetricStatus.abortus"] =
      "Jumlah para dan abortus tidak boleh melebihi kehamilan sebelumnya.";
  }

  if (!isNumberInRange(values.obstetricStatus.gestationalAgeWeeks, 4, 45)) {
    errors["obstetricStatus.gestationalAgeWeeks"] =
      "Usia kehamilan harus berada pada rentang 4–45 minggu.";
  }

  if (
    values.previousDeliveryInterval.status === "years" &&
    !isNumberInRange(values.previousDeliveryInterval.years, 1, 50)
  ) {
    errors["previousDeliveryInterval.years"] =
      "Jarak persalinan harus berada pada rentang 1–50 tahun.";
  }

  if (values.previousPregnancyHistory.length === 0) {
    errors.previousPregnancyHistory =
      "Pilih minimal satu riwayat kehamilan sebelumnya.";
  }

  if (
    values.previousPregnancyHistory.includes("normal") &&
    values.previousPregnancyHistory.length > 1
  ) {
    errors.previousPregnancyHistory =
      "Pilihan Normal tidak dapat digabungkan dengan riwayat komplikasi.";
  }

  if (values.comorbidities.length === 0) {
    errors.comorbidities = "Pilih minimal satu kondisi penyakit penyerta.";
  }

  if (
    values.comorbidities.includes("none") &&
    values.comorbidities.length > 1
  ) {
    errors.comorbidities =
      "Pilihan Tidak Ada tidak dapat digabungkan dengan penyakit lain.";
  }

  return errors;
}

export function hasInitialScreeningFormErrors(
  errors: InitialScreeningFormErrors,
) {
  return Object.keys(errors).length > 0;
}
