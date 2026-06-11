import type { ScreeningHistoryParams } from "@/api/screenings.api";
import { getAuthSession } from "@/features/auth/utils/auth-storage";
import { screeningHistoryMock } from "@/features/screenings/data/screening-history.mock";
import { mapScreeningHistoryDtoToHistory } from "@/features/screenings/mappers/screening.mapper";
import type {
  ScreeningDto,
  ScreeningHistoryDto,
} from "@/features/screenings/types/screening.dto";
import type {
  ScreeningFormValues,
  ScreeningResult,
} from "@/features/screenings/types/screening.type";
import { calculateRisk } from "@/features/screenings/utils/risk-calculator";

const STORAGE_KEY = "maternity_screenings_mock";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readScreenings(): ScreeningDto[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as ScreeningDto[];
  } catch {
    return [];
  }
}

function writeScreenings(screenings: ScreeningDto[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(screenings));
}

function mapStoredScreeningToHistoryDto(
  screening: ScreeningDto,
): ScreeningHistoryDto {
  return {
    id: screening.id,
    patient_id: screening.patient_id,
    patient_name: screening.patient_name ?? `Patient ${screening.patient_id}`,
    nurse_name: screening.nurse_name ?? "Unknown",
    maternal_age: screening.maternal_age,
    gestational_age_weeks: screening.gestational_age_weeks,
    risk_score: screening.risk_score,
    risk_category: screening.risk_category,
    created_at: screening.created_at,
  };
}

export async function getScreeningHistoryMock(params?: ScreeningHistoryParams) {
  await delay();

  const storedHistories = readScreenings().map((item) =>
    mapScreeningHistoryDtoToHistory(mapStoredScreeningToHistoryDto(item)),
  );

  const histories = [...storedHistories, ...screeningHistoryMock];

  return histories.filter((item) => {
    const keyword = params?.search?.toLowerCase() ?? "";

    const matchSearch =
      !keyword ||
      item.patientName.toLowerCase().includes(keyword) ||
      item.nurseName.toLowerCase().includes(keyword);

    const matchRisk =
      !params?.risk ||
      params.risk === "all" ||
      item.riskCategory === params.risk;

    const matchStartDate =
      !params?.startDate || item.screeningDate >= params.startDate;

    const matchEndDate =
      !params?.endDate || item.screeningDate <= params.endDate;

    return matchSearch && matchRisk && matchStartDate && matchEndDate;
  });
}

export async function submitScreeningMock(
  values: ScreeningFormValues,
): Promise<ScreeningResult> {
  await delay();

  const result = calculateRisk(values);
  const session = getAuthSession();

  const newScreening: ScreeningDto = {
    id: crypto.randomUUID(),
    patient_id: values.patientId,
    nurse_id: session?.user.id,
    nurse_name: session?.user.username ?? "Unknown",
    maternal_age: values.maternalAge,
    gravida: values.gravida,
    partus: values.partus,
    abortus: values.abortus,
    gestational_age_weeks: values.gestationalAgeWeeks,
    systolic_bp: values.systolicBp,
    diastolic_bp: values.diastolicBp,
    estimated_fetal_weight: values.estimatedFetalWeight,
    medical_history: values.medicalHistory,
    checklist_items: values.checklistItems,
    risk_score: result.riskScore,
    risk_category: result.riskCategory,
    created_at: new Date().toISOString(),
  };

  const screenings = readScreenings();

  writeScreenings([newScreening, ...screenings]);

  return result;
}
