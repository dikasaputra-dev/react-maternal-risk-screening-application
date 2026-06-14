import type {
  LaborMonitoringEntryDto,
  LaborMonitoringPayloadDto,
} from "../types/labor-monitoring.dto";
import type {
  LaborMonitoringEntry,
  LaborMonitoringFormValues,
} from "../types/labor-monitoring.type";

export function mapLaborMonitoringFormToPayload(
  values: LaborMonitoringFormValues,
): LaborMonitoringPayloadDto {
  return {
    recorded_at: new Date(values.recordedAt).toISOString(),

    vital_signs: {
      systolic_blood_pressure: values.vitalSigns.systolicBloodPressure,
      diastolic_blood_pressure: values.vitalSigns.diastolicBloodPressure,
      pulse: values.vitalSigns.pulse,
      respiratory_rate: values.vitalSigns.respiratoryRate,
      temperature: values.vitalSigns.temperature,
      oxygen_saturation: values.vitalSigns.oxygenSaturation,
    },

    fetal_heart_rate: values.fetalHeartRate,

    fetal_movement: values.fetalMovement,

    contractions: {
      frequency_per_10_minutes: values.contractions.frequencyPer10Minutes,
      duration_seconds: values.contractions.durationSeconds,
      intensity: values.contractions.intensity,
    },

    cervical_dilation_cm: values.cervicalDilationCm,

    head_descent: values.headDescent,

    membranes: {
      status: values.membranes.status,
      ruptured_at:
        values.membranes.status === "ruptured"
          ? new Date(values.membranes.rupturedAt).toISOString()
          : null,
      color:
        values.membranes.status === "ruptured" && values.membranes.color
          ? values.membranes.color
          : null,
    },

    urine: {
      volume_ml: values.urine.volumeMl,
      protein: values.urine.protein,
      acetone: values.urine.acetone,
    },
  };
}

export function mapLaborMonitoringDtoToEntry(
  dto: LaborMonitoringEntryDto,
): LaborMonitoringEntry {
  return {
    id: dto.id,
    patientId: dto.patient_id,

    recordedAt: dto.recorded_at,

    vitalSigns: {
      systolicBloodPressure: dto.vital_signs.systolic_blood_pressure,
      diastolicBloodPressure: dto.vital_signs.diastolic_blood_pressure,
      pulse: dto.vital_signs.pulse,
      respiratoryRate: dto.vital_signs.respiratory_rate,
      temperature: dto.vital_signs.temperature,
      oxygenSaturation: dto.vital_signs.oxygen_saturation,
    },

    fetalHeartRate: dto.fetal_heart_rate,

    fetalMovement: dto.fetal_movement,

    contractions: {
      frequencyPer10Minutes: dto.contractions.frequency_per_10_minutes,
      durationSeconds: dto.contractions.duration_seconds,
      intensity: dto.contractions.intensity,
    },

    cervicalDilationCm: dto.cervical_dilation_cm,

    headDescent: dto.head_descent,

    membranes: {
      status: dto.membranes.status,
      rupturedAt: dto.membranes.ruptured_at ?? null,
      color: dto.membranes.color ?? null,
    },

    urine: {
      volumeMl: dto.urine.volume_ml,
      protein: dto.urine.protein,
      acetone: dto.urine.acetone,
    },

    riskScore: dto.risk_score,

    riskCategory: dto.risk_category,

    riskFactors: dto.risk_factors ?? [],

    criticalFactors: dto.critical_factors ?? [],

    recordedBy: {
      id: dto.recorded_by.id,
      name: dto.recorded_by.name,
    },
  };
}

export function mapLaborMonitoringDtosToEntries(
  dtos: LaborMonitoringEntryDto[],
) {
  return dtos.map(mapLaborMonitoringDtoToEntry);
}
