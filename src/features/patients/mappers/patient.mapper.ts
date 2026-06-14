import type { PatientRiskSummary } from "@/features/clinical-risk/types/risk.type";

import type {
  PatientDto,
  PatientPayloadDto,
  PatientRiskSummaryDto,
} from "../types/patient.dto";
import type {
  PatientJourneyListSummaryDto,
  PatientListItemDto,
} from "../types/patient-list.dto";
import type {
  PatientJourneyListSummary,
  PatientListItem,
} from "../types/patient-list.type";
import type { Patient, PatientFormValues } from "../types/patient.type";

function mapPatientRiskSummaryDto(
  dto?: PatientRiskSummaryDto | null,
): PatientRiskSummary | null {
  if (!dto) {
    return null;
  }

  return {
    score: dto.score,
    category: dto.category,
    source: dto.source,
    assessedAt: dto.assessed_at,
  };
}

function mapPatientJourneyListSummaryDto(
  dto: PatientJourneyListSummaryDto,
): PatientJourneyListSummary {
  return {
    status: dto.status,

    documentedMilestones: dto.documented_milestones,

    totalMilestones: dto.total_milestones,

    completionPercentage: dto.completion_percentage,

    monitoringEntryCount: dto.monitoring_entry_count,

    clinicalActionCount: dto.clinical_action_count,

    hasInitialScreening: dto.has_initial_screening,

    hasDeliveryOutcome: dto.has_delivery_outcome,

    hasNewbornOutcome: dto.has_newborn_outcome,
  };
}

export function mapPatientDtoToPatient(dto: PatientDto): Patient {
  return {
    id: dto.id,
    fullName: dto.full_name,
    dateOfBirth: dto.date_of_birth,
    religion: dto.religion,
    education: dto.education,
    occupation: dto.occupation,
    race: dto.race,

    latestRisk: mapPatientRiskSummaryDto(dto.latest_risk),

    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
}

export function mapPatientDtosToPatients(dtos: PatientDto[]) {
  return dtos.map(mapPatientDtoToPatient);
}

export function mapPatientListItemDtoToPatientListItem(
  dto: PatientListItemDto,
): PatientListItem {
  return {
    ...mapPatientDtoToPatient(dto),

    journey: mapPatientJourneyListSummaryDto(dto.journey_summary),
  };
}

export function mapPatientListItemDtosToPatientListItems(
  dtos: PatientListItemDto[],
) {
  return dtos.map(mapPatientListItemDtoToPatientListItem);
}

export function mapPatientFormToPayload(
  values: PatientFormValues,
): PatientPayloadDto {
  if (!values.religion) {
    throw new Error("Agama pasien wajib dipilih.");
  }

  if (!values.education) {
    throw new Error("Pendidikan pasien wajib dipilih.");
  }

  return {
    full_name: values.fullName.trim(),

    date_of_birth: values.dateOfBirth,

    religion: values.religion,

    education: values.education,

    occupation: values.occupation.trim(),

    race: values.race.trim(),
  };
}
