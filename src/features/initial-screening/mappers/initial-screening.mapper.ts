import type {
  InitialScreeningDto,
  InitialScreeningPayloadDto,
} from "../types/initial-screening.dto";
import type {
  InitialScreening,
  InitialScreeningFormValues,
} from "../types/initial-screening.type";

export function mapInitialScreeningFormToPayload(
  values: InitialScreeningFormValues,
): InitialScreeningPayloadDto {
  return {
    height_cm: values.heightCm,

    vital_signs: {
      consciousness: values.vitalSigns.consciousness,
      systolic_blood_pressure: values.vitalSigns.systolicBloodPressure,
      diastolic_blood_pressure: values.vitalSigns.diastolicBloodPressure,
      pulse: values.vitalSigns.pulse,
      respiratory_rate: values.vitalSigns.respiratoryRate,
      temperature: values.vitalSigns.temperature,
      oxygen_saturation: values.vitalSigns.oxygenSaturation,
    },

    obstetric_status: {
      gravida: values.obstetricStatus.gravida,
      para: values.obstetricStatus.para,
      abortus: values.obstetricStatus.abortus,
      living_children: values.obstetricStatus.livingChildren,
      gestational_age_weeks: values.obstetricStatus.gestationalAgeWeeks,
    },

    previous_delivery_interval: {
      status: values.previousDeliveryInterval.status,
      years:
        values.previousDeliveryInterval.status === "years"
          ? values.previousDeliveryInterval.years
          : null,
    },

    previous_pregnancy_history: values.previousPregnancyHistory,

    comorbidities: values.comorbidities,
  };
}

export function mapInitialScreeningDtoToInitialScreening(
  dto: InitialScreeningDto,
): InitialScreening {
  return {
    id: dto.id,
    patientId: dto.patient_id,

    heightCm: dto.height_cm,

    vitalSigns: {
      consciousness: dto.vital_signs.consciousness,
      systolicBloodPressure: dto.vital_signs.systolic_blood_pressure,
      diastolicBloodPressure: dto.vital_signs.diastolic_blood_pressure,
      pulse: dto.vital_signs.pulse,
      respiratoryRate: dto.vital_signs.respiratory_rate,
      temperature: dto.vital_signs.temperature,
      oxygenSaturation: dto.vital_signs.oxygen_saturation,
    },

    obstetricStatus: {
      gravida: dto.obstetric_status.gravida,
      para: dto.obstetric_status.para,
      abortus: dto.obstetric_status.abortus,
      livingChildren: dto.obstetric_status.living_children,
      gestationalAgeWeeks: dto.obstetric_status.gestational_age_weeks,
    },

    previousDeliveryInterval: {
      status: dto.previous_delivery_interval.status,
      years: dto.previous_delivery_interval.years ?? 0,
    },

    previousPregnancyHistory: dto.previous_pregnancy_history,

    comorbidities: dto.comorbidities,

    riskScore: dto.risk_score,
    riskCategory: dto.risk_category,
    riskFactors: dto.risk_factors ?? [],
    criticalFactors: dto.critical_factors ?? [],

    screenedAt: dto.screened_at,

    screenedBy: {
      id: dto.screened_by.id,
      name: dto.screened_by.name,
    },
  };
}
